<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld
      id="hello"
      ref="hwid"
      :msg="this.messagex"
      test="Prueba de Prop y get"
    />
    <button v-on:click="setNewValues('test')">Refresh Data</button>
    <b-button v-b-modal.my-modal>Mostrar Modal</b-button>
    <div>
      <center>
        <h1>Todos los datos</h1>
        <div><FromApi :datos="this.dato"></FromApi></div>
        <h1>Todos los datos PARES</h1>
        <div><FromApi :datos="this.pares"></FromApi></div>
        <h1>Todos los datos IMPARES</h1>
        <div><FromApi :datos="this.impares"></FromApi></div>
      </center>
    </div>
    <b-modal id="my-modal" size="xl" ref="my-modal" hide-footer title="Prueba de Modal" no-close-on-esc no-close-on-backdrop>
      <b-container fluid>
        <b-table striped hover :items="pares.slice(0, 6)"></b-table>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import FromApi from "@/components/FromApi.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    FromApi,
  },

  data() {
    return {
      dato: null,
      pares: [],
      impares: [],
      messagex: "Aplicacion de Ejemplo para Lucho!!",
    };
  },

  mounted() {
    this.getComandas();
  },

  methods: {
    async getComandas() {
      this.dato = await this.$global.callGetAPI('Comandas');
      this.getComandasPares();
    },

    getComandasPares() {
      this.pares = [];
      this.impares = [];

      for (var i = 0; i < this.dato.length; i++) {
        if (this.dato[i].comandaId % 2 == 0) {
          this.pares.push(this.dato[i]);
        } else {
          this.impares.push(this.dato[i]);
        }
      }
    },

    setNewValues(texto) {
      texto = document.getElementById("itext").value;

      this.dato[5].fechaCierre = texto;
      this.messagex = texto;
    },
  },
};
</script>
