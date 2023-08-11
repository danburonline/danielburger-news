import { emailRegex } from '../constants/globals'

export function isEmailValid(email: string) {
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
