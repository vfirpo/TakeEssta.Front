<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ test }}</h2>
    <input id="itext" ref="itext" v-bind:value="test">
    <a href="./modulodelivery/index.html" target="_black">Click para navegar II!!!</a>
    <i>Aca se veria el boton</i><buttons :source="this.valor"></buttons>
  </div>
</template>

<script>
import buttons from './buttons.vue'

export default {
  components: { buttons },
  name: 'HelloWorld',
  props: {
    msg: null,
    test: null,
    valor: 0,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
