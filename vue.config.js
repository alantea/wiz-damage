module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/wiz-damage/'
    : '/',
  chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "黑貓維茲傷害試算";
              return args;
          })
  }
}
