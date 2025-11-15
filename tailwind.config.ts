import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        gray:{
          50: '#eaeaea',
          100: '#bebebf',
          200: '#9e9ea0',
          300: '#727275',
          400: '#56565a',
          500: '#333333',
          600: '#28282d',
          700: '#1f1f23',
          800: '#18181b',
          900: '#121215',
          1000: '#ececec',
          1100: '#F1E4D5',
          1200: '#e0e0e0',
          1300: '#FCF7F4',
          1400: '#F9F5F2',
          1500: '#FFF8F1'
        },
        purple:{
          50: '#f3eefc',
          100: '#d8cbf7',
          200: '#c6b2f3',
          300: '#ab8eee',
          400: '#9b79ea',
          500: '#8257e5',
          600: '#764fd0',
          700: '#5c3ea3',
          800: '#48307e',
          900: '#372560',
        },
        green:{
          50: '#e6fafe',
          100: '#b1f1ce',
          200: '#8cebb6',
          300: '#57e295',
          400: '#36dc81',
          500: '#04d361',
          600: '#04c058',
          700: '#039645',
          800: '#027435',
          900: '#025929',
          1000: '#18743a',
          1100: '#acca36',
          1200: '#B7D63A',
          1300: '#A0DD7F',
          1400: '#063B27',
        },
        red:{
          1100: '#DC3545',
        },
      },
      fontSize:{
        '5xl':'2.5rem',
      },
    },
  },
  plugins: [
  ],
}
export default config