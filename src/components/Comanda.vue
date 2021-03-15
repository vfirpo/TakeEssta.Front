<template>
  <div>
    <div  id="list_comandas" >
    <div v-for="comanda in source"
        :key="comanda.id">
      <div 
        id="comItem_951183126"
        class=comItem
        :style= "getComandaStyle(comanda)"
      >
        <div class="comItemNC">
          {{ comanda.comandaId }}<img height="30" src="/Img/logoChicoPY.png" />
        </div>
        <div class="comItemName">
          <font-awesome-icon :icon="['fas', 'address-card']" />
          {{ comanda.direccion }} + ALgo
        </div>
        <div class="comItemStat">
          <span class="Font12">Estado:</span>
          <span class="label label-default">{{
            comanda.estado.descripcion
          }}</span>
          <span class="label label-info"
            ><i class="fas fa-clock"></i> Entrega:
            {{ comanda.horaEntrega }} hs</span
          >
          <a
            id="LinkFacturar951183126"
            class="btn btn-default btn-xs btn_fc"
            role="button"
            onclick="alert('Apretaste Facturar');"
            ><i class="fas fa-file-invoice-dollar"></i> Facturar</a
          >
        </div>
        <div class="comItemTimes">
          <span class="Font12">Tiempo:</span>
          <span class="label label-default"
            ><i class="fas fa-stopwatch"></i> 27'</span
          >
          <span class="label label-default ent_estim_list"
            >{{ comanda.minutosEstimadosDesde }} + {{ comanda.minutosEstimadosHasta }}'</span
          >
        </div>
        <div class="comItemTot">
          {{ comanda.importe }}
          <span id="FPT951183126"
            ><i
              class="fas fa-money-bill pointer"
              style="color: #673ab7"
              title="Efectivo"
              onclick="fcn_formPagoCge(951183126, 1, 50, 'PEYA');"
            ></i
          ></span>
          <span
            id="LinkCobradoIcon951183126"
            aria-hidden="true"
            title="Comanda cobrada"
          ><i class="fas fa-check"></i> </span>
        </div>
        <div class="comItemActions">
          <a
            class="btn btn-success btn-xs"
            role="button"
            onclick="fcn_popup_revisar_comanda('951183126', '', '');"
            ><i class="fas fa-eye"></i> Ver pedido</a
          >
          <a
            id="LinkReimprimir951183126"
            class="btn btn-primary btn-xs"
            role="button"
            onclick="fcn_popup_reimprimir_comanda('951183126');"
            ><i class="fas fa-print"></i> Reimprimir</a
          >
          <a
            id="LinkModificar951183126"
            class="btn btn-warning btn-xs"
            role="button"
            onclick="fcn_modifificar_pedido('951183126', '');"
            ><i class="fas fa-edit"></i> Modificar</a
          >
          <a
            id="LinkAnular951183126"
            class="btn btn-danger btn-xs"
            role="button"
            onclick="fcn_popup_anular_comanda('951183126', 'X', '', '', '');"
            ><i class="fas fa-trash-alt"></i> Anular</a
          >
        </div>
        <div class="comItemModif">
          <i class="fas fa-sticky-note" style="color: #00bcd4"></i>
          {{ comanda.observacion1 }}
        </div>
        <div class="comItemModif">
          <i class="fas fa-angle-double-right txtNaranja"></i>
          {{ comanda.observacion2 }}
          <i class="fas fa-angle-right txtNaranja"></i>
          {{ comanda.observacion3 }}
        </div>
      </div>
    </div>
    </div>

    <div v-if="source" id="tfootMostrador" style="display: block;">
					  	<div class="divTotCol1" id="totComMost">Comandas: {{source.length}}</div>
					  	<div class="divTotCol2" id="totPrecioMost">Total ${{source.reduce((sum, v) => ( sum + v.importe ), 0)}}</div>
					  </div>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/free-solid-svg-icons";

export default {
  name: "Comanda",
  props: {
    cajaAbierta: true,
  },
  data() {
    return {
      source: {}
    }
  },

  mounted(){
    this.getComandas();
    this.windowonload();
    //document.getElementById("header_principal").hidden = true;
    //document.getElementById("spinner").hidden = true;
    //document.getElementById("list_comandas").hidden = "false";
  },
  methods: {
    getComandaStyle(com){
      if (com.comandaId % 2 === 0) {
        return 'border-color: blue'
      }
      else if(com.id === 6) {
        return 'border-color: red'
      }
      else{
        return 'border-color: green'
      }
    },
    windowonload : function () {
      console.log('paseporelwindowonloadinutil');
      let contenedor = this.$refs['contenedor_carga']; //Document.getElementById ('contenedor_carga');
      contenedor.style.visibility('hidden');
      contenedor.style.opacity ('0');
  },

    async getComandas() {
      this.source = await this.$global.callGetAPI('Comandas');
    },

    getCurrentUser:  function() {
      return this.$global.getCurrentUser();
    }

  },
};
</script>


<style>
</style>