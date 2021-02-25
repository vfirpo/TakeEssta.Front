<template>
  <div>
    <a
      class="btn btn-danger"
      role="button"
      href="#"
      type="button"
      @click="restar();"
      ><i class="fas fa-minus" />
    </a>
    <span
      ><input
        class="input_style"
        readonly=""
        type="text"
        id="prodCantNew_10"
        v-bind:value="source"
    /></span>
    <a
      class="btn btn-success "
      role="button"
      href="#"
      type="button"
      @click="sumar();"
      ><i class="fas fa-plus"></i
    ></a>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/free-solid-svg-icons";

export default {
  name: "botones",
  props: {
    source: 0,
    enabled: true,
  },

  methods: {
    sumar() {
        if (this.enabled) {
            this.source ++;
        }
    },

    restar() {
      if (this.source > 0 && this.enabled) {
        this.source --;
      }
    },
  },
};
</script>

<style>
</style>