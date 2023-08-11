'use server'

import { sql } from '@vercel/postgres'
import { Resend } from 'resend'
import SubscribeConfirmation from '../../emails/SubscribeConfirmation'
import SubscribeOptIn from '../../emails/SubscribeOptIn'
import { isEmailValid } from '../utils/functions/globals'

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
    await sql`INSERT INTO "public"."SUBSCRIBERS" (email, subscribed, opt_in) VALUES (${emailString}, NOW(), FALSE)`
    await sendConfirmationEmail(emailString)

    return {
      statusCode: 200,
      body: 'Your email has been added to my newsletter list. Please confirm your subscription by clicking on the link sent to your email.',
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
  const confirmationLink = `https://danielburger.news/verify?email=${encodeURIComponent(email)}`

  await resend.emails.send({
    from: 'Daniel Burger <mail@danielburger.news>',
    to: email,
    subject: 'Daniel’s Newsletter: Confirm your subscription',
    react: <SubscribeOptIn confirmationLink={confirmationLink} />
  })
}

export async function verifyAction(query: { email: string }) {
  const resend = new Resend(process.env.RESEND_API_KEY!)

  // Get email from URL query
  const email = query.email?.toString().toLowerCase() ?? ''

  // Update opt_in status and confirmation timestamp in database
  await sql`UPDATE "public"."SUBSCRIBERS" SET opt_in=TRUE, confirmation=NOW() WHERE email=${email}`

  await resend.emails.send({
    from: 'Daniel Burger <mail@danielburger.news>',
    to: email,
    subject: 'Daniel’s Newsletter: Subscription confirmed',
    react: <SubscribeConfirmation />
  })

  return {
    statusCode: 200,
    body: 'Your email subscription has been confirmed. Thank you!',
    headers: {
      'Content-Type': 'text/plain'
    }
  }
}
