import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        magenta: '#FF40FF',
        magentaDark: '#E700E7',
        magentaLight: '#FF80FF',
        dark: '#1A001A',
        bright: '#FFF7FF'
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
