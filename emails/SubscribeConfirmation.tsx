import { Body, Container, Head, Heading, Html, Link, Preview, Text } from '@react-email/components'
import * as React from 'react'

export default function SubscribeConfirmation() {
  return (
    <Html lang="en">
      <Head />
      <Preview>You’re All Set to Join Daniel Burger’s Newsletter!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you ❤️</Heading>

          <Text style={text}>
            I’m thrilled to welcome you my quarterly personal newsletter!{' '}
            <b>Your subscription has been successfully confirmed.</b> Feel free to check out the
            rest of my website:{' '}
            <Link href="https://danielburger.online" target="_blank">
              www.danielburger.online
            </Link>
          </Text>

          <Text
            style={{
              ...text,
              color: '#ababab',
              marginTop: '14px',
              marginBottom: '16px',
              fontSize: '14px'
            }}
          >
            If you changed your mind, you can unsubscribe{' '}
            <Link href="https://danielburger.news/unsubscribe" target="_blank" style={link}>
              here
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#111827',
  padding: '40px'
}

const container = {
  padding: '40px',
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '12px'
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0'
}

const link = {
  color: '#ababab',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline'
}

const text = {
  color: 'black',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '16px',
  margin: '24px 0'
}
