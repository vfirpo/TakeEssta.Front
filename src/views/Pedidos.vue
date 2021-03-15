<template>
  <div>
    <div id="contenedor_carga" ref="contenedor_carga">
      <b-spinner
        style="width: 3rem; height: 3rem"
        label="Cargando......"
        id="spinner"
      ></b-spinner>
    </div>
    <div class="container-fluid">
      <div class= "row align-items-start">
        <div class="col">
        <orderMainPanel :filter="filter"/>
        </div>
        <div class="col">
        <div class= "d-flex flex-row-reverse bd-highlight">
          <button type="button" class="btn btn-primary p-3 m-3 me-3">
            tomar pedido mostrador
          </button>
          <button type="button" class="btn btn-secondary p-3 m-3 me-3">
            tomar pedido delivery
          </button>
        </div>
        </div>
      </div>
    </div>  
    <Comandas />
  </div>
</template>

<script>
import Comandas from "@/components/Comanda.vue";
import Buttons from "../components/buttons.vue";
import orderMainPanel from "../components/OrderMainPanel.vue";

export default {
  name: "Pedidos",
  components: {
    Comandas,
    Buttons,
    orderMainPanel,
  },
  data() {
    return {
      dato: null,
      filter: {
        rendidas: Boolean,
        anuladas: Boolean,
        cobradas: Boolean,
        sinCobrar: Boolean,
        efectivo: Boolean,
        electronico: Boolean,
      },
    };
  },

  mounted() {
    document.getElementById("header_principal").hidden = true;

    this.setDefaultFilters();

    this.windowonload();
  },
  
  methods: {
    async getComandas() {
      this.dato = await this.$global.callGetAPI("Comandas");
    },
    getCurrentUser: function () {
      return this.$global.getCurrentUser();
    },
    windowonload: function () {
      var contenedor = document.getElementById("contenedor_carga");
      contenedor.style.visibility("hidden");
      contenedor.style.opacity("0");
    },
    setDefaultFilters() {
      this.filter.rendidas = false;
      this.filter.anuladas = false;
      this.filter.cobradas = true;
      this.filter.sinCobrar = true;
      this.filter.efectivo = true;
      this.filter.electronico = true;
    },
  },
};
</script>

