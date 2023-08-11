'use server'

import { sql } from '@vercel/postgres'
import { Resend } from 'resend'

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
      body: 'Your email is not a valid email address. Please try another email address.',

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
      body: 'Your email has been added to my newsletter list. Thank you!',

      headers: {
        'Content-Type': 'text/plain',
      },
    }
  } else {
    // If email is already in database, return message
    return {
      statusCode: 409,
      body: 'The email you entered is already on my newsletter list. Thank you!',

      headers: {
        'Content-Type': 'text/plain',
      },
    }
  }
}

export async function sendEmail() {
  const resend = new Resend(process.env.RESEND_API_KEY!)

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'authlogacc@pm.me',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
  })

  return {
    statusCode: 200,
    body: 'Email sent',
  }
}
