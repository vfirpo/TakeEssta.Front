<template>
  <div>
    <div style="border-radius: 4px; padding: 10px; background-color: #cc0000">
      <h3 style="color: #fff">Ventas - Apertura de Caja</h3>
    </div>
    <div class="container " >
      <!--desde Datalive -->
      <b-container class="bv-example-row">
        <b-row>
          <b-col class="col-2" ><strong><label for="ctrl_fecha">Fecha:</label></strong></b-col>
          <b-col class="col-3"><vc-date-picker
            v-model="fecha"
            id="ctrl_fecha"
            name="ctrl_fecha"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="bg-white border px-2 py-1 rounded"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </vc-date-picker></b-col>
        </b-row>
        <b-row>
          <b-col><strong><label for="ctrl_turnos">Turno:</label></strong></b-col>
          <b-col>          <b-form-select
            v-model="turno"
            :options="turnos"
            id="ctrl_turnos"
            name="ctrl_turnos"
          /></b-col>
        </b-row>
        <b-row>
          <b-col><strong><label for="ctrl_importe"
          >Dinero apertura::</label></strong></b-col>
          <b-col>          <b-input
            type="number"
            name="ctrl_importe"
            id="ctrl_importe"
          /></b-col>
        </b-row>
      </b-container>
      <br><br>
      <!-- Desde Datalive-->
      <b-button variant="primary" @click="abrirCaja()">Abrir Caja</b-button>
      <b-button variant="secondary" @click="$router.go(-1)">Volver</b-button>

    </div>
  </div>
</template>

<script>
import { Global } from "../assets/Global";

export default {
  name: "aperturaDeCaja",
  data() {
    return {
      fecha: new Date(),
      turno: 'M',
      importeInicial: 0,
      turnos: [
        { value: "M", text: "Mañana" },
        { value: "T", text: "Tarde" },
      ],
    };
  },

  mounted() {},
  methods: {
    abrirCaja(){

    },
  },
};
</script>

<style>
</style>