export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        html: '#E34F26',
        css: '#1572B6',
        js: '#F7DF1E',
        php: '#777BB4',
        laravel: '#FF2D20',
        vue: {
          green: '#42B883',
          blue: '#35495E'
        },
        python: {
          yellow: "#FFD43B",
          blue: "#306998",
        },
        mysql: {
          blue: "#4479A1",
          orange: "#F29111",
        },
      },
      backgroundImage: {
        'html-gradient': 'linear-gradient(to right, #E34F26, #F77F3F, #FBB03B)', //Html gradient
        'css-gradient': 'linear-gradient(to right, #1572B6, #33AADD, #70E0FF)', // CSS gradient
        'js-gradient': 'linear-gradient(to right, #F7DF1E, #F9A825)', // JS gradient
        'php-gradient': 'linear-gradient(to right, #777BB4, #9A77CF)', // PHP gradient
        'laravel-gradient': 'linear-gradient(to top right, #FF2D20 5%, #FF6A57, #FFAB7D)', //Laravel gradient
        'vue-gradient': 'linear-gradient(to top, #42B883, #35495E)', // Vue gradient
        'python-gradient': 'linear-gradient(to bottom right, #306998, #FFD43B )', // Python gradient
        'mysql-gradient' : 'linear-gradient(to bottom right, #4479A1 40%, #F29111)' //Myql gradient
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}