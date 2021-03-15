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
        opciones
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Ver resumen de caja</a>
        <a class="dropdown-item" href="#">Ver pedidos por empleados motos</a>
        <a class="dropdown-item" href="#">Ver ventas por volumen</a>
        <a class="dropdown-item" href="#">sonido activado</a>
        <a class="dropdown-item" href="#">cambiar grilla</a>
        <a class="dropdown-item" href="#">reiniciar</a>
      </div>
    </div>
    <div class="row p-1 ml-2">
      <div class="p-1">
      <button class="p-1">actualizar grilla</button>
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
          editar filtros
        </button>
        <div class="dropdown-menu" aria-labelledby="editar-filtros">
          <a @click="aplicFilter(1);" :style="(filter.rendidas) ? 'background-color: #4CAF50' : 'background-color: #f44336'"   class="dropdown-item" href="#">Ver comandas rendidas entregadas</a>
          <a @click="aplicFilter(2);" :style="(filter.anuladas) ? 'background-color: #4CAF50' : 'background-color: #f44336'" class="dropdown-item" href="#">Ver comandas anuladas</a>
          <a @click="aplicFilter(3);" :style="(filter.cobradas) ? 'background-color: #4CAF50' : 'background-color: #f44336'" class="dropdown-item" href="#">Ver comandas cobradas</a>
          <a @click="aplicFilter(4);" :style="(filter.sinCobrar) ? 'background-color: #4CAF50' : 'background-color: #f44336'" class="dropdown-item" href="#">Ver comandas sin cobrar</a>
          <a @click="aplicFilter(5);" :style="(filter.efectivo) ? 'background-color: #4CAF50' : 'background-color: #f44336'" class="dropdown-item" href="#">Ver comandas efectivo</a>
          <a @click="aplicFilter(6);" :style="(filter.electronico) ? 'background-color: #4CAF50' : 'background-color: #f44336'" class="dropdown-item" href="#">Ver comandas tarjeta</a>
        </div>
      </div>
      <div class="p-1">
      <button class="p-1">buscar</button>
      </div>
      <h5>trabajando en modo online</h5>
    </div>
    <div class="row p-1 ml-2">
      <div class="p-1">
      <button class="p-1">Asignacion de motos</button>
      </div>
      <div class="p-1">
      <button class="p-1">Rendir envio completo</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderMainPanel",
  props: {
    filter:{
        rendidas: Boolean,
        anuladas: Boolean,
        cobradas: Boolean,
        sinCobrar: Boolean,
        efectivo: Boolean,
        electronico: Boolean   
    }
  }  
};

</script>

<style>

</style>