<template>
  <div>
    <div id="contenedor_carga" ref="contenedor_carga">
      <b-spinner
        style="width: 3rem; height: 3rem"
        label="Cargando......"
        id="spinner"
      ></b-spinner>
    </div>
    <div id="contenedorOperacion" hidden>
      <div class="container-fluid">
        <div class="row align-items-start">
          <div class="col">
            <orderMainPanel :filter="filter" @updateFilter="updateFilter" />
          </div>
          <div class="col">
            <div class="d-flex flex-row-reverse bd-highlight">
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
      <comandas />
    </div>
  </div>
</template>

<script>
import comandas from "../components/Comanda.vue";
import Buttons from "../components/buttons.vue";
import orderMainPanel from "../components/OrderMainPanel.vue";

export default {
  name: "Pedidos",
  components: {
    comandas,
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
  },

  methods: {
    updateFilter(newValue) {
      this.filter = newValue;
    },

    async getComandas() {
      this.dato = await this.$global.callGetAPI("Comandas");
    },

    getCurrentUser: function () {
      return this.$global.getCurrentUser();
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

