import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        magenta: '#FF40FF',
        magentaBright: '#FF80FF',
        magentaBrighter: '#FFC5FF',
        bright: '#FFF7FF',
        darkBright: '#F2E6F2',
        medium: '#AB93AB',
        brightDark: '#594759',
        dark: '#1A001A'
      },
      fontFamily: {
        serif: ['Sentient-Variable', 'sans-serif'],
        sans: ['WorkSans-Variable', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
export default config
