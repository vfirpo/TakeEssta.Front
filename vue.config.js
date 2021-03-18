module.exports = {
    devServer: {
      proxy: "https://192.168.1.27:5001/"
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