<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h1>Valor de Vuex ??? {{ $store.getters.currentCashBox }}</h1>

    <HelloWorld
      id="hello"
      ref="hwid"
      :msg="this.messagex"
      test="Prueba de Prop y get"
    />
    <button v-on:click="setNewValues('test')">Refresh Data</button>
    <b-button v-b-modal.my-modal>Mostrar Modal</b-button>
    <div
      id="id5"
      draggable="true"
      @dragstart="drag"
      style="width: 40px; height: 40px; border-style: solid"
    >
      5
    </div>
    <div
      id="id10"
      draggable="true"
      @dragstart="drag"
      style="width: 40px; height: 40px; border-style: solid"
    >
      10
    </div>
    <div
      id="id20"
      draggable="true"
      @dragstart="drag"
      style="width: 40px; height: 40px; border-style: solid"
    >
      20
    </div>
    <div
      id="layout"
      @drop="drop"
      @dragover="allowDrop"
      class="container w-100"
      style="height: 200px; border-style: solid"
    ></div>
    <b-button @click="gethtml">Capturar Layout</b-button>
    <b-button @click="sethtml">Reemplazar Layout</b-button>
    <!-- <div>
      <center>
        <h1>Todos los datos</h1>
        <div><FromApi :datos="this.dato"></FromApi></div>
        <h1>Todos los datos PARES</h1>
        <div><FromApi :datos="this.pares"></FromApi></div>
        <h1>Todos los datos IMPARES</h1>
        <div><FromApi :datos="this.impares"></FromApi></div>
      </center>
    </div> -->
    <b-modal
      id="my-modal"
      size="xl"
      ref="my-modal"
      hide-footer
      title="Prueba de Modal"
      no-close-on-esc
      no-close-on-backdrop
    >
      <b-container fluid>
        <b-table striped hover :items="pares.slice(0, 6)"></b-table>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import FromApi from "@/components/FromApi.vue";


export default {
  name: "Home",
  components: {
    HelloWorld,
    FromApi,
  },

  data() {
    return {
      dato: null,
      pares: [],
      impares: [],
      messagex: "Aplicacion de Ejemplo para Lucho!!",
      x: 0,
      y: 0,
      html: '',
    };
  },

  beforeMount() {
    this.getComandas();
  },

  methods: {
    async getComandas() {
      this.dato = await this.$global.callGetAPI("Comandas");
      this.getComandasPares();
    },

    getComandasPares() {
      this.pares = [];
      this.impares = [];

      for (var i = 0; i < this.dato.length; i++) {
        if (this.dato[i].comandaId % 2 == 0) {
          this.pares.push(this.dato[i]);
        } else {
          this.impares.push(this.dato[i]);
        }
      }
    },

    setNewValues(texto) {
      texto = document.getElementById("itext").value;

      this.dato[5].fechaCierre = texto;
      this.messagex = texto;
    },

    allowDrop(ev) {
      //console.log(ev)
      ev.preventDefault();
    },

    drag(ev) {
      this.x = ev.offsetX;
      this.y = ev.offsetY;
      ev.dataTransfer.setData("text", ev.target.id);
    },

    drop(ev) {
      ev.preventDefault();
      let id = ev.dataTransfer.getData("text");
      let mover = ev.dataTransfer.getData("mover");
      let mesa = null;
      if (!mover){
        mesa = document.getElementById(id).cloneNode(true)
      }
      else {
        mesa = document.getElementById(id)
      }
      if(mover){
        this.y = ev.dataTransfer.getData("y");
        this.x = ev.dataTransfer.getData("x");
      }

      mesa.style.position = "absolute";
      let top = (parseInt(ev.pageY) - this.y) + "px";
      let left = (parseInt(ev.pageX) - this.x) + "px";
      mesa.id += "x";
      mesa.style.top = top;
      mesa.style.left = left;
      mesa.ondragstart = function(event){
        event.dataTransfer.setData("text", event.target.id);
        event.dataTransfer.setData("mover", true);
        event.dataTransfer.setData("x", event.offsetX);
        event.dataTransfer.setData("y", event.offsetY);
      };
      if (!mover){
        ev.target.appendChild(mesa);
      }
    },
    gethtml(){
      let layout = document.getElementById("layout");
      this.html = layout.innerHTML;
    },
    sethtml(){
      let layout = document.getElementById("layout");
      layout.innerHTML = this.html;
      let divs = layout.getElementsByTagName("div")
      divs.forEach(mesa => {
        mesa.ondragstart = function(event){
          event.dataTransfer.setData("text", event.target.id);
          event.dataTransfer.setData("mover", true);
          event.dataTransfer.setData("x", event.offsetX);
          event.dataTransfer.setData("y", event.offsetY);
      };
        
      });
    },
  },
};
</script>
