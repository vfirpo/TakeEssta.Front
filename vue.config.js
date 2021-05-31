module.exports = {
  devServer: {
    //proxy: "http://192.168.1.179:9090/"
  },

  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "Xava - TakeEssta";
            return args;
        })
  },

  transpileDependencies: [
    'vuetify'
  ]
}
