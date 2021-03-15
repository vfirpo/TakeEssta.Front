<template>
  <div>
    <div style="border-radius: 4px; padding: 10px; background-color: #cc0000">
      <h3 style="color: #fff">Ventas - Apertura de Caja</h3>
    </div>
    <!--desde Datalive -->
    <b-container class="container" id="boxcaja">
      <b-row>
        <b-col
          ><strong><label for="ctrl_fecha">Fecha:</label></strong></b-col
        >
        <b-col
          ><vc-date-picker v-model="fecha" id="ctrl_fecha" name="ctrl_fecha">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="bg-white border px-2 py-1 rounded"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template> </vc-date-picker
        ></b-col>
      </b-row>
      <div id="fecha">
        <b-row>
          <b-col
            ><strong><label for="ctrl_turnos">Turno:</label></strong></b-col
          >
          <b-col>
            <b-form-select
              v-model="turno"
              :options="turnos"
              id="ctrl_turnos"
              name="ctrl_turnos"
          /></b-col>
        </b-row>
      </div>
      <div id="fecha">
        <b-row>
          <b-col
            ><strong
              ><label for="ctrl_importe">Dinero apertura::</label></strong
            ></b-col
          >
          <b-col>
            <b-input
              type="number"
              name="ctrl_importe"
              v-model="importeInicial"
              id="ctrl_importe"
          /></b-col>
        </b-row>
      </div>
    </b-container>
    <br />
    <div class="container w-50">
      <b-alert v-model="alert.visible" variant="danger" show
        ><i class="fas fa-exclamation-triangle"></i> {{ alert.text }}</b-alert
      >
    </div>
    <br />
    <!-- Desde Datalive-->
    <b-button class="m-2" variant="primary" @click="abrirCaja()"
      >Abrir Caja</b-button
    >
    <b-button class="m-2" variant="secondary" @click="$router.go(-1)"
      >Volver</b-button
    >
  </div>
</template>

<script>

export default {
  name: "aperturaDeCaja",
  data() {
    return {
      alert: { text: "", visible: false },
      fecha: new Date(),
      turno: "M",
      importeInicial: 0,
      turnos: [
        { value: "M", text: "Mañana" },
        { value: "T", text: "Tarde" },
      ],
    };
  },

  mounted() {
    this.getlastCaja();
  },
  methods: {
    async abrirCaja() {
      let user = this.$global.getCurrentUser();
      let val = await this.$global.callPostAPI("Cajas/CrearCaja", {
        FechaApertura: this.fecha,
        SucursalId: user.sucursal.id,
        Turno: this.turno,
        InicioDeCaja: this.importeInicial,
        UserId: user.id,
      });

      this.$global.setCurrentCashBox(val.items[0]);

      this.$store.commit("changeCashBox", val.items[0].isOpen);

      if (val && val.items) {
        this.$router.push("/Ventas_HistorialDeCaja");
      }
      if (val && val.messagetype != 0) {
        this.alert.text = val.message;
        this.alert.visible = true;
      }
    },

    async getlastCaja() {
      let val = await this.$global.callGetAPI("Cajas/GetLast?sucursal=1");

      if (val && val.items) {
        this.importeInicial = val.items[0].totalTeoricoDeCaja
      }
    },
  },
};
</script>

<style>
#boxcaja {
  margin-top: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0.05);
  position: relative;
  z-index: 10;
  background-color: transparent;
  border: thin;
  padding: 1%;
  width: 500px;
}
#fecha {
  margin-top: 5px;
}
</style>