import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#4F46E5',
          600: '#4338CA',
        },
        secondary: {
          500: '#10B981',
          600: '#0D9F6E',
        },
        dark: {
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
export default config