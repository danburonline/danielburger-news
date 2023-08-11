'use server'

import { sql } from '@vercel/postgres'
import { isEmailValid } from '../../utils/functions/globals'

export async function unsubscribeFormAction(formData: FormData) {
  // Get email from form data
  const email = formData.get('email')
  const emailString = email?.toString().toLowerCase() ?? ''
  let validatedEmailString = isEmailValid(emailString!)

  // If email is invalid, don’t continue
  if (validatedEmailString === false) {
    return {
      statusCode: 422,
      body: 'The email you have entered is not a valid email address. Please provide a valid email address.',

      headers: {
        'Content-Type': 'text/plain'
      }
    }
  }

  // Attempt to delete the email from the database, whether it exists or not
  await sql`DELETE FROM "public"."SUBSCRIBERS" WHERE email=${emailString}`

  // Always return a success message
  return {
    statusCode: 200,
    body: 'If your email was on my newsletter list, it has been removed. Thank you!',
    headers: {
      'Content-Type': 'text/plain'
    }
  }
}
