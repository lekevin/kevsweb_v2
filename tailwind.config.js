export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',   // ← all your React files
  ],

  safelist: [
    'animate-eq1',
    'animate-eq2',
    'animate-eq3',
  ],

  theme: {
    extend: {
      colors: {
        customBlack: '#020C0B',
      },

      keyframes: {
        rollIn: {
          '0%':   { transform: 'rotateY(-89.99deg)', opacity: '0'   },
          '100%': { transform: 'rotateY(0deg)',      opacity: '0.8' },
        },
        rollOut: {
          '0%':   { transform: 'rotateY(0deg)',      opacity: '0.8' },
          '100%': { transform: 'rotateY(89.99deg)',  opacity: '0'   },
        },
        eq1: {
          '0%,100%': { height: '30%' },
          '50%'    : { height: '100%' },
        },
        eq2: {
          '0%,100%': { height: '70%' },
          '50%'    : { height: '20%'  },
        },
        eq3: {
          '0%,100%': { height: '40%' },
          '50%'    : { height: '90%'  },
        },
      },

      animation: {
        rollIn : 'rollIn 0.5s ease-out forwards',
        rollOut: 'rollOut 0.4s ease-in forwards',
        eq1    : 'eq1 1s infinite ease-in-out',
        eq2    : 'eq2 1s infinite ease-in-out',
        eq3    : 'eq3 1s infinite ease-in-out',
      },
    },
  },

  plugins: [],
};
