<template>
  <div>
    <h1>{{this.getCurrentUser().nickName}}</h1>
    <Comandas :source="this.dato"/>
  </div>
</template>

<script>
import Comandas from "@/components/Comanda.vue";

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
      this.dato = await this.$global.callGetAPI('Comandas');
    },
    getCurrentUser:  function() {
      return this.$global.getCurrentUser();
    }
  },
};
</script>

