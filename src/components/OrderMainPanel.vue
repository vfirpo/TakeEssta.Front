<template>
  <div>
    <div class="dropdown row p-1 ml-2">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Opciones
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Ver Resumen De Caja</a>
        <a class="dropdown-item" href="#">Ver Pedidos Por Empleados Motos</a>
        <a class="dropdown-item" href="#">Ver Ventas Por Volumen</a>
        <a class="dropdown-item" href="#">Sonido Activado</a>
        <a class="dropdown-item" href="#">Cambiar Grilla</a>
        <a class="dropdown-item" href="#">Reiniciar</a>
      </div>
    </div>
    <div class="row p-1 ml-2">
      <div class="p-1">
      <button class="p-1">Actualizar Grilla</button>
      </div>
      <div class="dropdown p-1">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="editar-filtros"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Editar Filtros
        </button>
        <div class="dropdown-menu" aria-labelledby="editar-filtros">
          <a @click="setFilters(1);" :style="(filter.rendidas) ? 'background-color: #4CAF50' : 'background-color: #f44336'"   class="dropdown-item" href="#">Ver Comandas Rendidas Entregadas</a>
          <a @click="setFilters(2);" :style="(filter.anuladas) ? 'background-color: #4CAF50' : 'background-color: #f44336'" class="dropdown-item" href="#">Ver Comandas Anuladas</a>
          <a @click="setFilters(3);" :style="(filter.cobradas) ? 'background-color: #4CAF50' : 'background-color: #f44336'" class="dropdown-item" href="#">Ver Comandas Cobradas</a>
          <a @click="setFilters(4);" :style="(filter.sinCobrar) ? 'background-color: #4CAF50' : 'background-color: #f44336'" class="dropdown-item" href="#">Ver Comandas Sin Cobrar</a>
          <a @click="setFilters(5);" :style="(filter.efectivo) ? 'background-color: #4CAF50' : 'background-color: #f44336'" class="dropdown-item" href="#">Ver Comandas Efectivo</a>
          <a @click="setFilters(6);" :style="(filter.electronico) ? 'background-color: #4CAF50' : 'background-color: #f44336'" class="dropdown-item" href="#">Ver Comandas Tarjeta</a>
        </div>
      </div>
      <div class="p-1">
      <button class="p-1">Buscar</button>
      </div>
      <h5>Trabajando En Modo Online</h5>
    </div>
    <div class="row p-1 ml-2">
      <div class="p-1">
      <button class="p-1">Asignacion De Motos</button>
      </div>
      <div class="p-1">
      <button class="p-1">Rendir Envio Completo</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderMainPanel",
    emits:{
    updateFilter: {}
  },
  props: {
    filter: {
        rendidas: Boolean,
        anuladas: Boolean,
        cobradas: Boolean,
        sinCobrar: Boolean,
        efectivo: Boolean,
        electronico: Boolean   
    },

  },

  methods: {
    setFilters(val){
      if (val == 1) {this.filter.rendidas    = !this.filter.rendidas;}
      if (val == 2) {this.filter.anuladas    = !this.filter.anuladas;}
      if (val == 3) {this.filter.cobradas    = !this.filter.cobradas;}
      if (val == 4) {this.filter.sinCobrar   = !this.filter.sinCobrar;}
      if (val == 5) {this.filter.efectivo    = !this.filter.efectivo;}
      if (val == 6) {this.filter.electronico = !this.filter.electronico;}

      this.$emit('updateFilter', this.filter)
    },
  },
};

</script>

<style>

</style>