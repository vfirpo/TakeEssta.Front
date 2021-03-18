<template>
  <div>
    <div id="contenedor_carga">
      <div class="animated zoomInUp" id="div_cargando_text">
        <b-spinner
          style="width: 3rem; height: 3rem"
          label="Cargando......"
          id="spinner"
        ></b-spinner>
        <br />
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
          <h5>
            Caja: {{ cashBox.id }} -
            {{ $global.formatDate(cashBox.fechaApertura) }} - Turno:
            {{ cashBox.turno }}
          </h5>
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
      <div>
        <div class="row justify-content-center">
          <div class="col-6">
            <h1>Mostrador</h1>
          </div>
          <div class="col-6">
            <h1>Delivery</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6"><comandas :data="pares" /></div>
        <div class=""> </div>
        <div class="col-6"><comandas :data="impares" /></div>
      </div>
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
      products: Object,
      stock: Object,
      pares: null,
      impares: null,
    };
  },

  async beforeMount() {
    this.cashBox = await this.$global.getCurrentCashBox();

    this.user = await this.$global.getCurrentUser();

    let sucursal = this.user.sucursal.id;

    let resp = await this.$global.callGetAPI(
      "Products/GetBySucursal?sucursalid=" + sucursal
    );

    this.products = resp.items;

    this.stock = await this.$global.callGetAPI(
      "Products/GetStockBySucursal?sucursalid=" + sucursal
    );

    this.actualizarStock();

    await this.getComandas();


    this.getComandasPares();
    
  
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
      let resp = await this.$global.callGetAPI("Comandas");

      this.dato = resp;
    },

    getCurrentUser: function () {
      return this.$global.getCurrentUser();
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

    setDefaultFilters() {
      this.filter.rendidas = false;
      this.filter.anuladas = false;
      this.filter.cobradas = true;
      this.filter.sinCobrar = true;
      this.filter.efectivo = true;
      this.filter.electronico = true;
    },

    actualizarStock() {
      this.products.forEach((item) => {
        let val = this.stock.filter((x) => x.productsId == item.id)[0];
        item.stock = val.stock;
      });
    },
  },
};
</script>


