module.exports = {
    devServer: {
      proxy: 'https://localhost:5001/'
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