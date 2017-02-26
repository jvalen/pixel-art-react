module.exports = (ctx) => {
  return {
    plugins: [
      require('postcss-import')({ addDependencyTo: ctx.webpack }),
      require('precss')(),
      require('autoprefixer')({
        browsers: ['last 2 versions', 'IE > 8']
      }),
      require('lost'),
      require('postcss-reporter')({
        clearMessages: true
      })
    ]
  }
}
