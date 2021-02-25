<template>
  <div>
    <div style="border-radius: 4px; padding: 10px; background-color: #cc0000">
      <h3 style="color: #fff">Ventas - Apertura de Caja</h3>
    </div>
    <div class="container " >
      <!--desde Datalive -->
      <div>
        <label for="ctrl_fecha">Fecha:</label>
        <div>
          <vc-date-picker
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
          </vc-date-picker>
        </div>
      </div>

      <div>
        <label for="ctrl_turnos">Turno:</label>
        <div>
          <b-form-select
            v-model="turno"
            :options="turnos"
            id="ctrl_turnos"
            name="ctrl_turnos"
          />
        </div>
      </div>

      <div>
        <label for="ctrl_importe"
          >Dinero apertura::</label>
        <div>
          <b-input
            type="number"
            name="ctrl_importe"
            id="ctrl_importe"
          />
        </div>
      </div>
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