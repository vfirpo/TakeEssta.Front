<template>
  <div>
    <div>
      <b-spinner label="spining"></b-spinner>
    </div>
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
   beforeMount() {
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

