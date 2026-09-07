import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Roboto Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: '#161310',
        'bg-raised': '#1c1815',
        fg: '#e8e0d4',
        'fg-dim': '#948a7c',
        accent: {
          DEFAULT: '#c17a3f',
          dim: '#8a5a35',
        },
        border: '#332c24',
      },
      maxWidth: {
        content: '42rem', // 680px, keeps line length under ~80 chars
      },
      borderRadius: {
        // deliberately flat — shadcn's default scale is much rounder,
        // this keeps every component on the terminal-hairline look
        DEFAULT: '2px',
        sm: '1px',
        md: '2px',
        lg: '3px',
      },
      boxShadow: {
        // no soft-grey card shadows anywhere; only used for the rare
        // focus ring
        none: 'none',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
        'crt-flicker': {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '92.5%': { opacity: '0.94' },
          '93%': { opacity: '1' },
          '96%': { opacity: '1' },
          '96.3%': { opacity: '0.96' },
          '96.6%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        'crt-flicker': 'crt-flicker 6s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config