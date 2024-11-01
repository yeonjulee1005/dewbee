import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        suit: ['SUIT Variable', 'Roboto', '-apple-system', 'sans-serif'],
        pretendard: ['Pretendard Variable', 'Pretendard', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#dffdf3',
          100: '#39edab',
          200: '#36e1a3',
          300: '#33d59a',
          400: '#30c991',
          500: '#2FC38D',
          600: '#2ab07f',
          700: '#218863',
          800: '#186246',
          900: '#0e3b2a',
          950: '#05130e',
        },
        green: {
          50: '#dffdf3',
          100: '#39edab',
          200: '#36e1a3',
          300: '#33d59a',
          400: '#30c991',
          500: '#2FC38D',
          600: '#2ab07f',
          700: '#218863',
          800: '#186246',
          900: '#0e3b2a',
          950: '#05130e',
        },
      },
      ringColor: {
        DEFAULT: '#A3A3A3',
      },
    },
  },
}
