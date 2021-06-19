<template>
  <div class="container">
    <div class="p-2 pb-1 items-center">
      <b-row class="p-1">
        <label class="" for="ipCode">Codigo</label>
        <input
          class="ml-auto rounded"
          type="text" 
          name="ipCode"
          id="ipCode"
          v-model="currentProduct.code"
        />
      </b-row>
      <b-row class="p-1">
        <label class="" for="ipDescription">Descripcion</label>
        <input
          class="ml-auto rounded"
          type="text"
          name="ipDescription"
          id="ipDescription"
          v-model="currentProduct.description"
        />
      </b-row>
      <b-row class="p-1">
        <label for="ipExtendedDescription">Detalle</label>
        <input
          class="ml-auto rounded"
          type="text"
          name="ipExtendedDescription"
          id="ipExtendedDescription"
          v-model="currentProduct.extendedDescription"
        />
      </b-row>
      <b-row>
        <label class="" for="cmbMarcas">Marca</label>
        <b-form-select
          id="cmbMarcas"
          v-model="selectedMarca"
          :options="lstMarcas"
          class="mb-3"
          value-field="id"
          text-field="description"
          disabled-field="notEnabled"
        >
          <!-- This slot appears above the options from 'options' prop -->
          <template #first>
            <b-form-select-option :value="null"
              >Seleccione una Opcion</b-form-select-option
            >
          </template>
        </b-form-select>
      </b-row>
      <b-row>
        <label for="cmbRubros">Rubro</label>
        <b-form-select
          id="cmbRubros"
          v-model="selectedRubro"
          :options="lstRubros"
          class="mb-3"
          value-field="id"
          text-field="description"
          disabled-field="notEnabled"
          @change="cmbRubroChange()"
        >
          <!-- This slot appears above the options from 'options' prop -->
          <template #first>
            <b-form-select-option :value="null"
              >Seleccione una Opcion</b-form-select-option
            >
          </template>
        </b-form-select>
      </b-row>
      <b-row>
        <label for="cmbSubRubros">Sub Rubro</label>
        <b-form-select
          id="cmbSubRubros"
          v-model="selectedSubRubro"
          :options="lstFilteredSubRubros"
          class="mb-3"
          value-field="id"
          text-field="description"
          disabled-field="notEnabled"
        >
          <!-- This slot appears above the options from 'options' prop -->
          <template #first>
            <b-form-select-option :value="null"
              >Seleccione una Opcion</b-form-select-option
            >
          </template>
        </b-form-select>
      </b-row>
      <b-row>
        <label for="cmbUnits">Unidad de Medida</label>
        <b-form-select
          id="cmbUnits"
          v-model="selectedUnit"
          :options="lstUnits"
          class="mb-3"
          value-field="id"
          text-field="description"
          disabled-field="notEnabled"
        >
          <!-- This slot appears above the options from 'options' prop -->
          <template #first>
            <b-form-select-option :value="null"
              >Seleccione una Opcion</b-form-select-option
            >
          </template>
        </b-form-select>
      </b-row>
      <b-row class="p-1">
        <label class="" for="ipEAN">Codido de Barra (EAN)</label>
        <input
          class="ml-auto rounded"
          type="number"
          name="ipEAN"
          id="ipEAN"
          v-model="currentProduct.ean"
        />
      </b-row>
      <b-row class="p-1">
        <label class="" for="ipStockAlert">Stock Minimo</label>
        <input
          class="ml-auto rounded"
          type="number"
          name="ipStockAlert"
          id="ipStockAlert"
          v-model="currentProduct.stockAlert"
        />
      </b-row>
      <b-row class="p-1">
        <label class="" for="ipExternalCode">Codigo Externo</label>
        <input
          class="ml-auto rounded"
          type="text"
          name="ipExternalCode"
          id="ipExternalCode"
          v-model="currentProduct.externalCode"
        />
      </b-row>
      <b-row>
        <div class="container sombraBox">
          <h5>Desde Aca van combos</h5>
          <label for="cmbTABS">TABS</label>
          <b-form-select
            id="cmbTABS"
            v-model="selectedTAB"
            :options="lstTABS"
            class="mb-3"
            value-field="id"
            text-field="description"
            disabled-field="notEnabled"
          >
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <b-form-select-option :value="null"
                >Seleccione un TAB</b-form-select-option
              >
            </template>
          </b-form-select>

          <label for="cmbBehaviours">Comportamientos</label>
          <b-form-select
            id="cmbBehaviours"
            v-model="selectedBehaviours"
            :options="lstBehavioursToSelect"
            class="mb-3"
            value-field="id"
            text-field="description"
            disabled-field="notEnabled"
            :select-size="5"
          >
          </b-form-select>
          <b-button class="p-2 m-2" variant="info" @click="addBehaviour()">
            Agregar
          </b-button>
          <b-button class="p-2 m-2" variant="info" @click="removeBehaviour()">
            Remover
          </b-button>
          <label for="cmbProdBehaviours">Comportamientos del Producto</label>
          <b-form-select
            id="cmbProdBehaviours"
            v-model="selectedCurrentBehaviour"
            :options="lstCurrentBehaviours"
            class="mb-3"
            value-field="id"
            text-field="description"
            disabled-field="notEnabled"
            :select-size="5"
          >
          </b-form-select>
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
import axios from "axios";

export default {
  name: "crudProducts",
  props: {
    newProduct: false,
    lstMarcas: null,
    lstBehaviours: null,
    lstRubros: null,
    lstSubRubros: null,
    lstUnits: null,
    currentProduct: null
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
      lstTABS: null,
      selectedTAB: null,
      lstBehavioursToSelect: null,
      selectedBehaviours: null,
      lstCurrentBehaviours: [],
      selectedCurrentBehaviour: null,
    };
  },

  mounted() {
    if (this.newProduct) {
      this.currentProduct.id = 0;
      this.currentProduct.price = 0;
      this.currentProduct.price2 = 0;
      this.currentProduct.price3 = 0;
      this.currentProduct.stockAlert = 0;
      this.currentProduct.ean = "";

      this.currentProduct.sucursalId = this.$global.getCurrentUser().sucursal.id;
      this.currentProduct.code = "";
      this.currentProduct.description = "";
      this.currentProduct.extendedDescription = "";
      this.currentProduct.externalCode = "";

      this.selectedRubro = null;
      this.cmbRubroChange();
      this.selectedSubRubro = null;
      this.selectedMarca = null;
      this.selectedUnit = null;
      this.lstCurrentBehaviours = [];
    } else {
      this.selectedRubro =
        this.currentProduct.rubro == null ? null : this.currentProduct.rubro.id;
      this.cmbRubroChange();
      this.selectedSubRubro =
        this.currentProduct.subRubro == null
          ? null
          : this.currentProduct.subRubro.id;
      this.selectedMarca =
        this.currentProduct.productBrand == null
          ? null
          : this.currentProduct.productBrand.id;
      this.selectedUnit =
        this.currentProduct.unit == null ? null : this.currentProduct.unit.id;
      this.lstCurrentBehaviours = this.currentProduct.behaviours.filter(
        (x) => x.type != "TAB"
      );
    }
    this.getTabList();
    this.getBehabioursList();
  },

  methods: {
    cmbRubroChange() {
      var sr = this.lstSubRubros.filter((x) => x.rubroId == this.selectedRubro);
      this.lstFilteredSubRubros = sr;
      this.selectedSubRubro = null;
    },
    cancelEdition() {
      this.$emit("cancelEdition");
    },

    async confirmChanges() {
      this.currentProduct.behaviours = this.getcurrentBehaviours();
      this.currentProduct.unit = this.lstUnits.filter(
        (x) => x.id == this.selectedUnit
      )[0];
      this.currentProduct.rubro = this.lstRubros.filter(
        (x) => x.id == this.selectedRubro
      )[0];
      this.currentProduct.subRubro = this.lstSubRubros.filter(
        (x) => x.id == this.selectedSubRubro
      )[0];
      this.currentProduct.productBrand = this.lstMarcas.filter(
        (x) => x.id == this.selectedMarca
      )[0];

      await this.$global.callPostAPI('Products/InsertUpdate', this.currentProduct);
      
      this.$emit("cancelEdition");
    },

    getcurrentBehaviours() {
      let lst = this.lstCurrentBehaviours;
      let tab = this.lstBehaviours.filter((x) => x.id == this.selectedTAB);
      if (tab.length > 0) {
        lst.push(tab[0]);
      }
      return lst;
    },

    getTabList() {
      var tabs = this.lstBehaviours.filter((x) => x.type == "TAB");
      this.lstTABS = tabs;
      if (this.newProduct) {
        this.selectedTAB = null;
      } else {
        let seltab = this.currentProduct.behaviours.filter(
          (x) => x.type == "TAB"
        );
        this.selectedTAB = seltab.length > 0 ? seltab[0].id : null;
      }
    },

    getBehabioursList() {
      let bh = this.lstBehaviours.filter(
        (x) => x.type != "TAB" && x.type.indexOf("PRODUCT") != -1
      );
      this.lstBehavioursToSelect = bh;
    },

    addBehaviour() {
      if (this.selectedBehaviours !== null) {
        if (
          this.lstCurrentBehaviours.filter(
            (x) => x.id == this.selectedBehaviours
          ).length == 0
        ) {
          this.lstCurrentBehaviours.push(
            this.lstBehavioursToSelect.filter(
              (x) => x.id == this.selectedBehaviours
            )[0]
          );
        }
      }
    },
    removeBehaviour() {
      if (this.selectedCurrentBehaviour !== null) {
        this.lstCurrentBehaviours = this.lstCurrentBehaviours.filter(
          (x) => x.id !== this.selectedCurrentBehaviour
        );
      }
    },
  },
};
</script>

<style>
</style>