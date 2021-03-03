<template>
  <div>
    <h1>{{this.getCurrentUser().normalizedNickName}}</h1>
    <Comandas :source="this.dato"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Comandas from "@/components/Comanda.vue";
import {Global} from "../assets/Global";

export default {
  name: "Pedidos",
  components: {
    Comandas,
  },
  data() {
    return {
      dato: null,
    };
  },
   mounted() {
    document.getElementById("header_principal").hidden = true;
    this.getComandas();
  },
  methods: {
    async getComandas() {
      this.dato = await Global.callGetAPI('Comandas');
    },
    getCurrentUser:  function() {
      return JSON.parse(localStorage.getItem("User"));
    }
  },
};
</script>

