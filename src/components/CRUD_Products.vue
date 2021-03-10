<template>
  <div class="container">
    <div class="p-2 pb-1 items-center">
    <b-row class="p-1">
        <label class="" for="ipCode">Codigo</label>
        <input class="ml-auto rounded" type="text" name="ipCode" id="ipCode" v-model="currentProduct.code" >
    </b-row>
    <b-row class="p-1">
        <label class="" for="ipDescription">Descripcion</label>
        <input class="ml-auto rounded" type="text" name="ipDescription" id="ipDescription" v-model="currentProduct.description" >
    </b-row>
    <b-row class="p-1">
        <label for="ipExtendedDescription">Detalle</label>
        <input class="ml-auto rounded" type="text" name="ipExtendedDescription" id="ipExtendedDescription" v-model="currentProduct.extendedDescription">
    </b-row>
    <b-row>
        <label class="" for="cmbMarcas">Marca</label>
            <b-form-select id="cmbMarcas" v-model="selectedMarca" :options="lstMarcas" class="mb-3" value-field="id" text-field="description" disabled-field="notEnabled">
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null"
                  >Seleccione una Opcion</b-form-select-option>
              </template>
            </b-form-select>
    </b-row>
    <b-row>
        <label for="cmbRubros">Rubro</label>
            <b-form-select id="cmbRubros" v-model="selectedRubro" :options="lstRubros" class="mb-3" value-field="id" text-field="description" disabled-field="notEnabled" @change="cmbRubroChange()">
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null"
                  >Seleccione una Opcion</b-form-select-option>
              </template>
            </b-form-select>
    </b-row>
    <b-row>
        <label for="cmbSubRubros">Sub Rubro</label>
            <b-form-select id="cmbSubRubros" v-model="selectedSubRubro" :options="lstFilteredSubRubros" class="mb-3" value-field="id" text-field="description" disabled-field="notEnabled">
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null"
                  >Seleccione una Opcion</b-form-select-option>
              </template>
            </b-form-select>
    </b-row>
    <b-row>
        <label for="cmbUnits">Unidad de Medida</label>
            <b-form-select id="cmbUnits" v-model="selectedUnit" :options="lstUnits" class="mb-3" value-field="id" text-field="description" disabled-field="notEnabled">
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null"
                  >Seleccione una Opcion</b-form-select-option>
              </template>
            </b-form-select>
    </b-row>
    <b-row class="p-1">
        <label class="" for="ipEAN">Codido de Barra (EAN)</label>
        <input class="ml-auto rounded" type="number" name="ipEAN" id="ipEAN" v-model="currentProduct.ean">
    </b-row>
    <b-row class="p-1">
        <label class="" for="ipPedidoMinimo">Pedido Minimo</label>
        <input class="ml-auto rounded" type="number" name="ipPedidoMinimo" id="ipPedidoMinimo">
    </b-row>
    <b-row class="p-1">
        <label class="" for="ipExternalCode">Codigo Externo</label>
        <input class="ml-auto rounded" type="text" name="ipExternalCode" id="ipExternalCode" v-model="currentProduct.externalCode">
    </b-row>
    <b-row>
        <div class="container sombraBox" >
            <h5>Desde Aca</h5>
            <h3>Lista de Combos para Beaviours</h3>
        </div>
    </b-row>
    <b-row class="mt-1">
        <b-button class="p-2 m-2" variant="success" @click="confirmChanges()">
        Aceptar
        </b-button>
        <b-button class="p-2 m-2" variant="secondary" @click="cancelEdition()">
        Cancelar
        </b-button>
    </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "crudProducts",
  props: {
    newProduct: false,
    lstMarcas: null,
    lstBehaviours: null,
    lstRubros: null,
    lstSubRubros: null,
    lstUnits: null,
    currentProduct: {
      id: 0,
      sucursalId: 0,
      code: String,
      description: String,
      extendedDescription: String,
      externalCode: String,
      rubro: {
        id: 0,
        description: String
      },
      subRubro: {
        id: 0,
        rubroId: 0,
        description: String
      },
      unit: {
        id: 0,
        description: String,
        value: String
      },
      productBrand: {
        id: 0,
        description: String
      },
      ean: String,
      price: 0,
      price2: 0,
      price3: 0,
      stockAlert: 0,
      stock: 0,
      behaviours: [
        {
          id: 0,
          type: String,
          description: String,
          value: String,
          idParent: 0
        }
      ]
    },
    
  },

  data() {
    return {
      items: null,
      sucursal: 0,
      sucursalDescription: "",
      alert: { text: "", visible: false, seconds: 0 },
      selectedRubro: null,
      selectedSubRubro: null,
      lstFilteredSubRubros: null,
      selectedMarca: null,
      selectedUnit: null,
      lstBehaviours: null
    };
  },

  mounted() {

      if(this.newProduct){
        this.selectedRubro = null
        this.cmbRubroChange()
        this.selectedSubRubro = null
        this.selectedMarca = null
        this.selectedUnit = null
      }
      else {
        this.selectedRubro = this.currentProduct.rubro.id
        this.cmbRubroChange()
        this.selectedSubRubro = this.currentProduct.subRubro.id
        this.selectedMarca = this.currentProduct.productBrand.id
        this.selectedUnit = this.currentProduct.unit.id
      }
  },

  updated(){
      //document.getElementById("cmbRubros").value = this.currentProduct.rubro.id;
  },

  methods: {

    cmbRubroChange() {
      var sr = this.lstSubRubros.filter((x) => x.rubroId == this.selectedRubro);
      this.lstFilteredSubRubros = sr;
      this.selectedSubRubro = null;
    },
    cancelEdition(){
        this.$emit('cancelEdition');
    },
    confirmChanges(){
        console.log(this.currentProduct)
    },

  },
};
</script>

<style>
</style>