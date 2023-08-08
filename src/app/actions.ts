'use server'

import { sql } from '@vercel/postgres'
import validate from 'deep-email-validator'

export async function formAction(formData: FormData) {
  // Get email from form data
  const email = formData.get('email')
  const emailString = email?.toString().toLowerCase() ?? ''
  let validatedEmailString = await validate(emailString!)

  // If email is invalid, don’t continue
  if (validatedEmailString.valid === false) {
    return {
      statusCode: 422,
      body: 'Email is invalid',

      headers: {
        'Content-Type': 'text/plain',
      },
    }
  }

  // Check if email is already in database
  const { rows } =
    await sql`SELECT * from "public"."SUBSCRIBERS" where email=${emailString}`

  // If email is not in database, add it
  if (rows.length === 0) {
    await sql`INSERT INTO "public"."SUBSCRIBERS" (email) VALUES (${emailString})`

    return {
      statusCode: 200,
      body: 'Success',

      headers: {
        'Content-Type': 'text/plain',
      },
    }
  } else {
    // If email is already in database, return message
    return {
      statusCode: 409,
      body: 'Email already exists',

      headers: {
        'Content-Type': 'text/plain',
      },
    }
  }
}
