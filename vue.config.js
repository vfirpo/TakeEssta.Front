module.exports = {
    devServer: {
      proxy: 'https://localhost:44370/'
    },
    chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "Xava - TakeEssta";
              return args;
          })
  }    
  }