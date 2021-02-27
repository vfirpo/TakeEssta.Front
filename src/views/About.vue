<template>
  <div class="about">
    <botones :source="this.valor" :enabled="this.enabled" />
    <h1>This is an about page</h1>
    <Comandas :source="this.dato"/>
    <FromApi :datos="this.dato"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Comandas from "@/components/Comanda.vue";
import FromApi from "@/components/FromApi.vue";
import botones from "@/components/buttons.vue";
import {Global} from "../assets/Global";

export default {
  name: "About",
  components: {
    Comandas,
    FromApi,
    botones,
  },


  data() {
    return {
      dato: null,
      pares: [],
      impares: [],
      messagex: "Aplicacion de Ejemplo para Lucho!!",
      valor: 0,
      enabled: true,
    };
  },

  mounted() {
    this.getComandas();
  },

  methods: {
    async getComandas() {
      this.dato = await Global.callGetAPI('Comandas');
    }
  },
};
</script>

