<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-2">
        <p>Titulo</p>
      </div>
      <div class="col-6">
        <input
          class="ml-auto rounded form-control"
          type="text"
          aria-label="Sizing example input"
        />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-2">
        <p>Descripcion</p>
      </div>
      <div class="col-6">
        <input
          class="ml-auto rounded form-control"
          type="text"
          aria-label="Sizing example input"
        />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 pl-3">
        <p>Validez Desde</p>
        <div class="">
          <input
            type="date"
            id="start"
            name="trip-start"
            value="2018-07-22"
            min="2018-01-01"
            max="2030-12-31"
          />
        </div>
      </div>
      <div class="col-3">
        <p>Hasta:</p>
        <input
          type="date"
          id="start"
          name="trip-start"
          value="2018-07-22"
          min="2018-01-01"
          max="2030-12-31"
        />
        <b-form-checkbox
          id="checkbox-3"
          name="checkbox-3"
          value="accepted"
          unchecked-value="not_accepted"
        >
          Sin fecha de finalizacion
        </b-form-checkbox>
      </div>
    </div>
    <div class="row justify-content-center">
      <div>
        <b-form-group
          label="Turno:"
          label-for="nested-street"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <div class="pl-3">
            <b-form-select
              v-model="SelectedTurno"
              :options="Turno"
            ></b-form-select>
          </div>
        </b-form-group>
      </div>
      <div>
        <b-form-group
          label="Orden:"
          label-for="nested-street"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input id="nested-street"></b-form-input>
        </b-form-group>
      </div>
    </div>
    <div class="row justify-content-center">
      <b-form-group
        label="Tab:"
        label-for="nested-street"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <div class="pl-3">
          <b-form-select v-model="selectedTab" :options="Tab"></b-form-select>
        </div>
      </b-form-group>
      <div class="col-3">
        <b-form-group label="Color:" label-cols-sm="3" label-align-sm="right">
          <div class="pl-3">
            <b-form-input id="color" type="color"></b-form-input>
          </div>
        </b-form-group>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <b-form-group
          label="Opcionales"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <div class="pl-4">
            <b-form-select v-model="selectedAdicionales" :options="opcionales">
            </b-form-select>
          </div>
        </b-form-group>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <b-form-group
          label="Descuento FIJO en $:"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input type="number"> </b-form-input>
        </b-form-group>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <b-form-group
          label="Precio Final:"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input type="number"> </b-form-input>
        </b-form-group>
      </div>
    </div>
    <div class="row justify-content-center">
      <h5>Aplicar Por Dias de la Semana</h5>
    </div>
    <div class="row justify-content-center">
      <div>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            v-model="selectedSemana"
            :options="options"
            :aria-describedby="ariaDescribedby"
            buttons
            button-variant="primary"
            size="lg"
            name="buttons-2"
          ></b-form-checkbox-group>
        </b-form-group>
      </div>
    </div>
    <div class="row justify-content-center">
      <b-button><i class="fas fa-plus"></i> Abrir Configuracion </b-button>
    </div>
    <div class="container">
      <b-dropdown-item href="#"> Rubro </b-dropdown-item>
      <b-form-select v-model="selectedRubros" :options="Rubros"></b-form-select>
      <b-dropdown-item href="#">sub-rubro </b-dropdown-item>
      <b-form-select v-model="selectedSubrubro" :options="SubRubros">
      </b-form-select>
      <b-dropdown-item href="#"> Producto </b-dropdown-item>
      <b-form-select
        v-model="selectedProducto"
        :options="Productos"
      ></b-form-select>
      <div class="p-3">
        <b-form-group
          label="Cantidad Minima:"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input type="number"> </b-form-input>
        </b-form-group>
      </div>
      <div class="p-3">
        <b-form-group
          label="Cantidad Maxima:"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-input type="number"> </b-form-input>
        </b-form-group>
      </div>
      <div class="row">
        <b-dropdown-item href="#"> Producto </b-dropdown-item>
        <b-form-select
          v-model="selectedsubrubro"
          :options="subrubro"
        ></b-form-select>
      </div>
      <div class="row">
        <b-dropdown-item href="#"> Producto </b-dropdown-item>
        <b-form-select
          v-model="selectedsubrubro"
          :options="subrubro"
        ></b-form-select>
      </div>
      <div class="row">
        <b-dropdown-item href="#"> Producto </b-dropdown-item>
        <b-form-select
          v-model="selectedsubrubro"
          :options="subrubro"
        ></b-form-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "crudpromotions",
  props: {
    currentPromotions: {
      id: 0,
      code: String,
      description: String,
      extendedDescription: String,
      sucursal: {
        id: 0,
        description: String,
        estate: String,
        city: String,
        address: String,
        lat: 0,
        long: 0,
        mainPhone: String,
        secondaryPhone: String,
        contactEMail: String,
      },
      price: 0,
      activeFrom: Object,
      activeTo: Object,
      activeDays: String,
      image: String,
      isActive: true,
      PromotionsConfig: [
        {
          id: 0,
          rubro: {
            id: 0,
            description: String,
          },
          subRubro: {
            id: 0,
            rubroId: 0,
            description: String,
          },
          subRubro2: {
            id: 0,
            rubroId: 0,
            description: String,
          },
          subRubro3: {
            id: 0,
            rubroId: 0,
            description: String,
          },
          subRubro4: {
            id: 0,
            rubroId: 0,
            description: String,
          },
          fixedProducts: [
            {
              id: 0,
              sucursalId: 0,
              code: String,
              description: String,
              extendedDescription: String,
              externalCode: String,
              rubro: {
                id: 0,
                description: String,
              },
              subRubro: {
                id: 0,
                rubroId: 0,
                description: String,
              },
              unit: {
                id: 0,
                description: String,
                value: String,
              },
              productBrand: {
                id: 0,
                description: String,
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
                  idParent: 0,
                },
              ],
            },
          ],
          minUnits: 0,
          maxUnits: 0,
          behaviours: [
            {
              id: 0,
              type: String,
              description: String,
              value: String,
              idParent: 0,
            },
          ],
        },
      ],
      behaviours: [
        {
          id: 0,
          type: String,
          description: String,
          value: String,
          idParent: 0,
        },
      ],
    },
  },
  data() {
    return {
      selectedTurno: null,
      Turno: [
        { value: null, text: "Todos" },
        { value: "a", text: "Mañana" },
        { value: "b", text: "Tarde" },
      ],
      selectedTab: null,
      Tab: [{ value: null, text: "Promos" }],
      selectedAdicionales: null,
      opcionales: [
        { value: null, text: "Ninguno" },
        { value: "a", text: "Gratinado" },
        { value: "b", text: "Complementos" },
        { value: "c", text: "Coccion" },
      ],
      types: ["number"],
      selectedSemana: [],
      options: [
        { text: "Lunes", value: "lunes" },
        { text: "Martes", value: "martes" },
        { text: "Miercoles", value: "miercoles" },
        { text: "Jueves", value: "jueves" },
        { text: "Viernes", value: "viernes" },
        { text: "Sabado", value: "sabado" },
        { text: "Domingo", value: "domingo" },
      ],
      selectedRubro: null,
      Rubros: [{ value: null, text: "Eliga rubros" }],
      selectedSubrubro: null,
      SubRubros: [{ value: null, text: "Eliga subrubros" }],
      selectedProducto: null,
      Productos: [{ value: null, text: "Empanada de Vacio" }],
      selectedSubrubro: null,
      subrubro: [{ value: null, text: "tradicionales" }],
    };
  },
};
</script>

<style>
</style>