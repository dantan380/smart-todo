/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{html,js,ejs}'
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '.75rem',     // Extra small
        'sm': '.875rem',    // Small
        'base': '1rem',     // Base (this is the default)
        'lg': '1.125rem',   // Large
        'xl': '1.25rem',    // Extra large
        'xxl': '1.5rem',    // 2 times large
        'xxxl': '1.75rem',    // Super size, with extra fries
        // You can add more custom font sizes here
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "white"
          },
          "100%": {
            borderColor: "transparent",
          }
        }
      },
      animation: {
        typing: "typing 2s steps(20), blink .7s steps(20) 5"
      }
    },
  },
  plugins: [],
}

