module.exports = {
  chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "黑貓維茲傷害試算";
              return args;
          })
  }
}