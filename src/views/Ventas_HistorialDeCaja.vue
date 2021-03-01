<template>
  <div>
    <div style="border-radius: 4px; padding: 10px; background-color: #cc0000">
      <h3 style="color: #fff">Ventas - Historial de Caja</h3>
    </div>
    <div style="text-align: center">
      <div style="padding: 10px">
        <b-button class="bg-success" @click="abrirCaja()">
          <i class="fas fa-cash-register"></i> Abrir Caja
        </b-button>
        <br/>
        <div class="container w-50 pt-3">
          <b-alert
            :show="alert.seconds"
            dismissible
            fade
            variant="danger"
            @dismiss-count-down="countDownChanged"
            ><i class="fas fa-exclamation-triangle"></i>
            {{ alert.text }}
          </b-alert>
        </div>
        <h4>
          Mostrando pagina {{ this.currentPage }} de {{ this.totalPages }}
        </h4>
      </div>
      <div class="row justify-content-center">
        <div class="col-11">
          <table id="TablaCajas" style="width: 100%">
            <thead>
              <tr>
                <th>Caja Id</th>
                <th>Fecha</th>
                <th>Turno</th>
                <th>Estado</th>
                <th>Sucursal</th>
                <th>Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody v-if="items">
              <tr v-for="item in items.items" :key="item.id">
                <td
                  :style="
                    item.isOpen
                      ? 'background-color: #a3cfbb'
                      : 'background-color: #ea868f'
                  "
                >
                  {{ item.id }}
                </td>
                <td
                  :style="
                    item.isOpen
                      ? 'background-color: #a3cfbb'
                      : 'background-color: #ea868f'
                  "
                >
                  {{ getDate(item.fechaApertura) }}
                </td>
                <td
                  :style="
                    item.isOpen
                      ? 'background-color: #a3cfbb'
                      : 'background-color: #ea868f'
                  "
                >
                  {{ item.turno }}
                </td>
                <td
                  :style="
                    item.isOpen
                      ? 'background-color: #a3cfbb'
                      : 'background-color: #ea868f'
                  "
                >
                  {{ item.isOpen ? "Abierta" : "Cerrada" }}
                </td>
                <td
                  :style="
                    item.isOpen
                      ? 'background-color: #a3cfbb'
                      : 'background-color: #ea868f'
                  "
                >
                  {{ item.sucursalDescripcion }}
                </td>
                <td
                  :style="
                    item.isOpen
                      ? 'background-color: #a3cfbb'
                      : 'background-color: #ea868f'
                  "
                >
                  {{ item.userNombre }}
                </td>
                <td
                  :style="
                    item.isOpen
                      ? 'background-color: #a3cfbb'
                      : 'background-color: #ea868f'
                  "
                >
                  <b-button
                    :style="
                      item.isOpen
                        ? 'background-color: #198754'
                        : 'background-color: #dc3545'
                    "
                    class="btn-sm"
                    @click="abrirEstaCaja(item.id)"
                    ><i class="fas fa-eye" /> Ver Detalle Caja</b-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-11">
          <div class="overflow-auto">
            <pagination
              :totalPages="this.totalPages"
              @pageSelected="getCajas"
            ></pagination>
          </div>
        </div>
      </div>
      <b-button class="bg-info" @click="toExcel('TablaCajas')"
        >Export to Excel</b-button
      >
    </div>
  </div>
</template>

<script>
import { Global } from "../assets/Global";
import pagination from "@/components/Pagination.vue";

export default {
  components: {
    pagination,
  },
  name: "historialDeCaja",

  data() {
    return {
      fields: [
        "id",
        "fechaApertura",
        "fechaCierre",
        "sucursalDescripcion",
        "turno",
        "userNombre",
        "Acciones",
      ],
      items: null,
      currentPage: 1,
      pageSize: 18,
      totalPages: 0,
      sucursal: 1,
      alert: { text: "", visible: false, seconds: 0 },
    };
  },
  mounted() {
    this.getCajas(1);
  },
  methods: {
    async getCajas(page) {
      this.currentPage = page;

      let params =
        "?Sucursal=" +
        this.sucursal +
        "&PageSize=" +
        this.pageSize +
        "&CurrentPage=" +
        this.currentPage;

      this.items = await Global.callGetAPI("Cajas/GetCajasToList" + params);
      //this.items = await $v.$global.callGetAPI("Cajas/GetCajasToList" + params);
      this.totalPages = Math.ceil(this.items.recordCounts / this.pageSize);
    },
    toExcel(val) {
      Global.exportTableToExcel(val);
    },

    abrirEstaCaja(idCaja) {
      alert("Esta es la Caja " + idCaja);
    },
    getDate(value) {
      return Global.formatDate(value);
    },
    async abrirCaja() {
      let params = "?Sucursal=" + this.sucursal;

      let resp = await Global.callGetAPI("Cajas/IsOpen" + params);
      if (resp) {
        this.alert.seconds = 5;
        this.alert.text = "Ya existen cajas abiertas.";
        this.alert.visible = true;
      } else {
        this.$router.push("/Ventas_AperturaDeCaja");
      }
    },
    countDownChanged(dismissCountDown) {
      this.alert.seconds = dismissCountDown;
    },
  },
};
</script>

<style>
</style>