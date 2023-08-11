'use server'

import { sql } from '@vercel/postgres'
import { Resend } from 'resend'
import SubscribeConfirmation from '../../emails/SubscribeConfirmation'
import { isEmailValid } from '../../utils/functions/globals'

export async function subscribeFormAction(formData: FormData) {
  // Get email from form data
  const email = formData.get('email')
  const emailString = email?.toString().toLowerCase() ?? ''
  let validatedEmailString = isEmailValid(emailString!)

  // If email is invalid, don’t continue
  if (validatedEmailString === false) {
    return {
      statusCode: 422,
      body: 'Your email is not a valid email address. Please try another email address.',

      headers: {
        'Content-Type': 'text/plain'
      }
    }
  }

  // Check if email is already in database
  const { rows } = await sql`SELECT * from "public"."SUBSCRIBERS" where email=${emailString}`

  // If email is not in database, add it
  if (rows.length === 0) {
    await sql`INSERT INTO "public"."SUBSCRIBERS" (email, subscribed) VALUES (${emailString}, NOW())`
    await sendConfirmationEmail(emailString)

    return {
      statusCode: 200,
      body: 'Your email has been added to my newsletter list. Thank you!',
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  } else {
    // If email is already in database, return message
    return {
      statusCode: 409,
      body: 'The email you entered is already on my newsletter list. Thank you!',

      headers: {
        'Content-Type': 'text/plain'
      }
    }
  }
}

async function sendConfirmationEmail(email: string) {
  const resend = new Resend(process.env.RESEND_API_KEY!)

  await resend.emails.send({
    from: 'Daniel Burger <mail@danielburger.news>',
    to: email,
    subject: 'Daniel’s News: Subscription Confirmation',
    react: <SubscribeConfirmation />
  })
}
