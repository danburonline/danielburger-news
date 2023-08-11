'use server'

import { sql } from '@vercel/postgres'

const emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

function isEmailValid(email: string) {
  if (!email) return false

  if (email.length > 254) return false

  let valid = emailRegex.test(email)
  if (!valid) return false

  // Further checking of some things regex can't handle
  let parts = email.split('@')
  if (parts[0].length > 64) return false

  let domainParts = parts[1].split('.')
  if (
    domainParts.some(function (part) {
      return part.length > 63
    })
  )
    return false

  return true
}

export async function formAction(formData: FormData) {
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
