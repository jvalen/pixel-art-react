module.exports = () => ({  
  plugins: {
    'postcss-import': {},
    'precss': {},
    'autoprefixer': {
      browsers: ['last 2 versions', 'IE > 8']
    },
    'lost': {},
    'postcss-reporter': {
      clearMessages: true
    }
  }
})
