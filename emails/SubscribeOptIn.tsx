import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Button
} from '@react-email/components'
import * as React from 'react'
import { Font } from '@react-email/font'

export default function SubscribeOptIn({ confirmationLink }: { confirmationLink: string }) {
  return (
    <Html lang="en">
      <Head />
      <Font
        fontFamily="Sentient-Variable"
        fallbackFontFamily="Helvetica"
        webFont={{
          url: 'https://danielburger.news/fonts/Sentient-Variable.woff2',
          format: 'woff2'
        }}
        fontWeight={700}
        fontStyle="normal"
      />
      <Font
        fontFamily="WorkSans-Variable"
        fallbackFontFamily="Helvetica"
        webFont={{
          url: 'https://danielburger.news/fonts/WorkSans-Variable.woff2',
          format: 'woff2'
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="WorkSans-Variable"
        fallbackFontFamily="Helvetica"
        webFont={{
          url: 'https://danielburger.news/fonts/WorkSans-Variable.woff2',
          format: 'woff2'
        }}
        fontWeight={600}
        fontStyle="normal"
      />
      <Preview>Please confirm your subscription for Daniel Burger’s Newsletter!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Almost there...</Heading>

          <Text style={text}>
            Thank you for showing interest in my quarterly personal newsletter! To complete your
            subscription and start receiving updates, please{' '}
            <b>confirm your email by clicking on the button below.</b>
          </Text>

          <Button href={confirmationLink} target="_blank" style={button}>
            Confirm your subscription
          </Button>

          <Text
            style={{
              ...text,
              color: '#AB93AB',
              marginTop: '24px',
              marginBottom: '14px',
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
  backgroundColor: '#1A001A',
  padding: '40px'
}

const button = {
  fontFamily: 'Sentient-Variable, sans-serif',
  display: 'block',
  backgroundColor: '#FF40FF',
  color: '#1A001A',
  paddingTop: '14px',
  paddingBottom: '14px',
  paddingLeft: '20px',
  paddingRight: '20px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  border: 'none',
  cursor: 'pointer'
}

const container = {
  padding: '40px',
  margin: '0 auto',
  backgroundColor: '#FFF7FF',
  borderRadius: '12px'
}

const h1 = {
  color: '#1A001A',
  fontFamily: "'Sentient-Variable', serif",
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0'
}

const link = {
  color: '#AB93AB',
  fontFamily: "'WorkSans-Variable', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline'
}

const text = {
  color: '#1A001A',
  fontFamily: "'WorkSans-Variable', sans-serif",
  fontSize: '16px',
  margin: '24px 0'
}
