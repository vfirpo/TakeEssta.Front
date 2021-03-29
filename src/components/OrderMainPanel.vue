<template>
  <div class="container">
    <div class="row dropdown p-1 ">
      <div class="col-2">
        <button
          style="height: 35px; background-repeat: no-repeat"
          class="btn-xs btn btn-secondary dropdown-toggle p-1"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-ellipsis-v"></i> Opciones
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#"><i class="fas fa-cash-register"></i> Ver Resumen De Caja</a>
          <a class="dropdown-item" href="#"><i class="fas fa-chart-bar"></i> Ver Pedidos Por Empleados Motos</a>
          <a class="dropdown-item" href="#"
            ><i class="fas fa-chart-line"></i> Ver Ventas Por Volumen</a
          >
          <a class="dropdown-item" href="#"
            ><i class="fas fa-volume-up"></i> Sonido Activado</a
          >
          <a class="dropdown-item" href="#"
            ><i class="fas fa-grip-vertical"></i> Cambiar Grilla</a
          >
          <a class="dropdown-item" href="#"
            ><i class="fas fa-power-off"></i> Reiniciar</a
          >
        </div>
      </div>
      <div class="col-10 pl-2" style="background: red">
        <div class="text-white">
          <i
            class="fas fa-exclamation-triangle"
            style="color: #ffeb3b; margin-right: 5px"
          ></i>
          <b>ATENCIÓN!</b> Llegó al tope de caja. Realice el alivio
          correspondiente
        </div>
      </div>
    </div>
    <div class="row p-1 ml-2">
      <div class="p-1">
        <button class="btn-sm btn btn-light btn-outline-dark" type="button" @click="raiseRefreshGRid">
          <i class="fas fa-sync-alt"></i> Actualizar Grilla
        </button>
      </div>
      <div class="dropdown p-1">
        <button
          class="btn-sm btn btn-secondary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <i class="fas fa-filter"></i> Editar Filtros
        </button>
        <ul class="dropdown-menu dropdown-filters p-2" aria-labelledby="editar-filtros">
          <li>
            <a
              @click="setFilters(1)"
              :style="getFilterBGColor(1, filter.rendidas)"
              class="dropdown-item"
              href="#"
              ><i id="xI1" class="fas"></i> Ver Comandas Rendidas Entregadas</a
            >
          </li>
          <li>
            <a
              @click="setFilters(2)"
              :style="getFilterBGColor(2, filter.anuladas)"
              class="dropdown-item"
              href="#"
              ><i id="xI2" class="fas"></i> Ver Comandas Anuladas</a
            >
          </li>
          <li>
            <a
              @click="setFilters(3)"
              :style="getFilterBGColor(3, filter.cobradas)"
              class="dropdown-item"
              href="#"
              ><i id="xI3" class="fas"></i> Ver Comandas Cobradas</a
            >
          </li>
          <li>
            <a
              @click="setFilters(4)"
              :style="getFilterBGColor(4, filter.sinCobrar)"
              class="dropdown-item"
              href="#"
              ><i id="xI4" class="fas"></i> Ver Comandas Sin Cobrar</a
            >
          </li>
          <li>
            <a
              @click="setFilters(5)"
              :style="getFilterBGColor(5, filter.efectivo)"
              class="dropdown-item"
              href="#"
              ><i id="xI5" class="fas"></i> Ver Comandas Efectivo</a
            >
          </li>
          <li>
            <a
              @click="setFilters(6)"
              :style="getFilterBGColor(6, filter.electronico)"
              class="dropdown-item"
              href="#"
              ><i id="xI6" class="fas"></i> Ver Comandas Tarjeta</a
            >
          </li>
          <li class="dropdown-divider"></li>
          <li>
            <a
              @click="setFilters(0)"
              href="#"
              class="dropdown-item bgColorNaranja"
              ><span><i class="fas fa-redo-alt"></i></span> Filtros por
              default</a
            >
          </li>
        </ul>
      </div>
      <div class="p-1">
        <button class="btn-xs btn btn-light btn-outline-dark">
          <i class="fas fa-search"></i> Buscar
        </button>
      </div>
      <h6><i class="fas fa-wifi"></i> Trabajando En Modo Online</h6>
    </div>
    <div class="row p-1 ml-2">
      <div class="p-1">
        <button class="btn-xs btn btn-success btn-outline-dark">
          <i class="fas fa-motorcycle"></i> Asignacion De Motos
        </button>
      </div>
      <div class="p-1">
        <button class="btn-xs btn btn-warning btn-outline-dark">
          <i class="fas fa-money-bill-wave"></i> Rendir Envio Completo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderMainPanel",
  emits: {
    updateFilter: {},
  },
  props: {
    filter: {
      rendidas: Boolean,
      anuladas: Boolean,
      cobradas: Boolean,
      sinCobrar: Boolean,
      efectivo: Boolean,
      electronico: Boolean,
    },
  },

  methods: {
    getFilterBGColor(i, val) {
      let a = document.getElementById("xI" + i);
      if (a) {
        a.classList.toggle(val ? "fa-eye" : "fa-eye-slash");
      }
      return val ? "background-color: #4CAF50" : "background-color: #f44336";
    },
    
    raiseRefreshGRid(){
      console.log('Paso por el raise')
      this.$emit("refreshGrid");
    },

    setFilters(val) {
      if (val == 0) {
        this.filter.rendidas = false;
        this.filter.anuladas = false;
        this.filter.cobradas = true;
        this.filter.sinCobrar = true;
        this.filter.efectivo = true;
        this.filter.electronico = true;
      }

      if (val == 1) {
        this.filter.rendidas = !this.filter.rendidas;
      }
      if (val == 2) {
        this.filter.anuladas = !this.filter.anuladas;
      }
      if (val == 3) {
        this.filter.cobradas = !this.filter.cobradas;
      }
      if (val == 4) {
        this.filter.sinCobrar = !this.filter.sinCobrar;
      }
      if (val == 5) {
        this.filter.efectivo = !this.filter.efectivo;
      }
      if (val == 6) {
        this.filter.electronico = !this.filter.electronico;
      }

      this.$emit("updateFilter", this.filter);
    },
  },
};
</script>

<style>
li {
  padding: 1px;
}
</style>