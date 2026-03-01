/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080c14',
        surface: '#0d1424',
        panel: '#111827',
        border: '#1e2d45',
        teal: {
          glow: '#00e5c8',
          mid: '#00b8a0',
          dark: '#007a6b',
        },
        amber: {
          glow: '#ffb830',
        },
        muted: '#4a6180',
        dim: '#8ba3c0',
      },
      fontFamily: {
        display: ['"Space Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px #00e5c8, 0 0 20px #00e5c840' },
          '50%': { boxShadow: '0 0 16px #00e5c8, 0 0 40px #00e5c880' },
        },
      },
    },
  },
  plugins: [],
}