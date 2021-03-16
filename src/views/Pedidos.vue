<template>
  <div>
    <div id="contenedor_carga">
      <div class="animated zoomInUp" id="div_cargando_text">
        <b-spinner
          style="width: 3rem; height: 3rem"
          label="Cargando......"
          id="spinner"
        ></b-spinner>
        <br>
        <img height="120" src="/Img/logo_Xava.jpg" /><br /><br />
        <b>CARGANDO FUNCIONES DEL SISTEMA</b>
      </div>
    </div>
    <div id="contenedorOperacion" hidden>
      <nav
        style="background-color: #90ee90"
        class="navbar navbar-expand-lg navbar-light sombraBox"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              style="height: 30px"
              alt="INICIO"
              src="/Img/logo_Xava.jpg"
              class="d-inline-block align-top"
            />
          </a>
          <h5>Caja: {{ cashBox.id }} - {{ cashBox.fechaApertura }} Turno: {{ cashBox.turno }}</h5>
          <h5>Lita Actual-General</h5>
          <img style="height: 30px" src="../assets/logo.png" alt="" />
        </div>
      </nav>
      <div class="container-fluid">
        <div class="row align-items-start">
          <div class="col">
            <orderMainPanel :filter="filter" @updateFilter="updateFilter" />
          </div>
          <div class="col">
            <div class="d-flex flex-row-reverse bd-highlight">
              <div class="p-1">
                <button
                  style="
                    border-radius: 5px;
                    height: 100px;
                    width: 200px;
                    text-align: center;
                    font-size: 30px;
                    font-weight: 900;
                    line-height: 1;
                    padding: 5px;
                    box-shadow: 2px 2px 5px #999;
                  "
                  type="button"
                  id="btn-pedidos"
                  class="btn btn-warning"
                >
                  Tomar
                  <br />
                  Pedido
                  <br />
                  <span style="font-size: 17px">DELIVERY</span>
                </button>
                <div class="p-1">
                  <b-form-checkbox
                    id="checkbox-1"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >
                    Fijar Lluvia
                  </b-form-checkbox>
                </div>
              </div>
              <div class="p-1">
                <button
                  style="
                    border-radius: 5px;
                    height: 100px;
                    width: 200px;
                    text-align: center;
                    font-size: 30px;
                    font-weight: 900;
                    line-height: 1;
                    padding: 5px;
                    box-shadow: 2px 2px 5px #999;
                  "
                  type="button"
                  id="btn-pedidos"
                  class="btn btn-secondary"
                >
                  Tomar
                  <br />
                  Pedido

                  <span style="font-size: 17px">MOSTRADOR</span>
                </button>
              </div>
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
      cashBox: Object,
      user: Object,
    };
  },

  beforeMount(){
    this.cashBox = this.$global.getCurrentCashBox();
    this.user = this.$global.getCurrentUser();
  },

  mounted() {
    let menu = document.getElementById("header_principal");

    menu.parentNode.removeChild(menu);

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


