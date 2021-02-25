<template>
  <nav aria-label="Page navigation" >
    <ul class="pagination">      <li class="page-item"  v-for="i in this.totalPages" v-bind:key=i><input type="button" class="page-link" @click="clicnav(i)" :value="i" /></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "pagination",
  emits:{
    pageSelected: null
  },
  props: {
    totalPages: 0,
  },
  methods: {
    clicnav(page){
      this.$emit("pageSelected", page)
      //alert('Ir a la pagina: ' + page);
    },
  }
};
</script>

<style>
</style>