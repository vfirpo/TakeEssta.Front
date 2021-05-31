<template>
  <div class="container-fluid">
    <div class="row justify-content-center p-2">
      <div class="col-2">
        <p>Codigo</p>
      </div>
      <div class="col-6">
        <input
          class="ml-auto rounded form-control"
          type="text"
          aria-label="Sizing example input"
          v-model="currentPromotions.code"
        />
      </div>
    </div>
    <div class="row justify-content-center p-2">
      <div class="col-2">
        <p>Descripcion</p>
      </div>
      <div class="col-6">
        <input
          class="ml-auto rounded form-control"
          type="text"
          aria-label="Sizing example input"
          v-model="currentPromotions.description"
        />
      </div>
    </div>
    <div class="row justify-content-center p-2">
      <div class="col-2">
        <p>Extended Description</p>
      </div>
      <div class="col-6">
        <input
          class="ml-auto rounded form-control"
          type="text"
          aria-label="Sizing example input"
          v-model="currentPromotions.extendedDescription"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-2 pl-3">
        <p>Validez Desde</p>
      </div>
        <div>
          <vc-date-picker v-model="currentPromotions.activeFrom" id="from" name="from">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="bg-white border px-2 py-1 rounded"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </vc-date-picker>


          <!-- <b-form-input id="from" type="date" value-as-date v-model="currentPromotions.activeFrom"></b-form-input>          <b-form-datepicker id="from" size="sm" v-model="currentPromotions.activeFrom"></b-form-datepicker> -->
        </div>
      <div class="col-2 ">
        <p>Hasta:</p>
      </div>
        <div>
          <vc-date-picker v-model="currentPromotions.activeTo" id="to" name="to">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="bg-white border px-2 py-1 rounded"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </vc-date-picker>
          <!-- <b-form-input id="to" type="date" value-as-date v-model="currentPromotions.dateTo"></b-form-input>          <b-form-datepicker id="from" size="sm" v-model="currentPromotions.activeFrom"></b-form-datepicker> -->
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
    <div class="row justify-content-center pt-2">
      <div class="col-1">
        <p>Turno:</p>
      </div>
      <div class="col-3 px-4">
        <b-form-select v-model="selectedTurno" :options="Turno"></b-form-select>
      </div>
      <div class="col-1">
        <p>Orden:</p>
      </div>
      <div class="col-3">
        <b-form-input id="nested-street"></b-form-input>
      </div>
    </div>
    <div class="row justify-content-center pt-2">
      <div class="col-1">
        <p>Tab:</p>
      </div>
      <div class="col-3">
        <b-form-select v-model="selectedTab" :options="Tab"></b-form-select>
      </div>
      <div class="col-1">
        <p>Color:</p>
      </div>
      <div class="col-3">
        <b-form-input id="color" type="color"></b-form-input>
      </div>
    </div>
    <div class="row justify-content-center p-2">
      <div class="col-2">
        <p>Opcionales</p>
      </div>
      <div class="col-6">
        <b-form-select v-model="selectedAdicionales" :options="opcionales">
        </b-form-select>
      </div>
    </div>
    <div class="row justify-content-center p-2">
      <div class="col-2">
        <p>Precio final</p>
      </div>
      <div class="col-6">
        <input
          class="ml-auto rounded form-control"
          type="number"
          aria-label="Sizing example input"
        />
      </div>
    </div>
    <div class="row justify-content-center">
      <h5>Aplicar Por Dias de la Semana</h5>
    </div>
    <div class="row justify-content-center">
      <div id="check-box-dias">
        <ul class="ks-cboxtags">
          <li>
            <input
              type="checkbox"
              id="checkboxOne"
              value="Rainbow Dash"
            /><label for="checkboxOne">Lunes</label>
          </li>
          <li>
            <input type="checkbox" id="checkboxTwo" value="Moondancer" /><label
              for="checkboxTwo"
              >Martes</label
            >
          </li>
          <li>
            <input
              type="checkbox"
              id="checkboxThree"
              value="Rainbow Dash"
            /><label for="checkboxThree">Miercoles</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="checkboxFour"
              value="Rainbow Dash"
            /><label for="checkboxFour">Jueves</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="checkboxFive"
              value="Rainbow Dash"
            /><label for="checkboxFive">Viernes</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="checkboxSix"
              value="Rainbow Dash"
            /><label for="checkboxSix">Sabado</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="checkboxSeven"
              value="Rainbow Dash"
            /><label for="checkboxSeven">Domingo</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="row justify-content-center">
      <b-button v-b-toggle.collapse-2
        ><i class="fas fa-plus"></i> Abrir Configuracion
      </b-button>
    </div>
    <div>
      <!-- <div v-for="config in currentPromotions.promotionsConfig"
        :key="config.promotionsConfig.id">
          <p>{{config.rubro.description}}</p><br>
          <p>{{config.subrubro.description}}</p><br>
          <p>{{config.minUnits}}</p><br>
          <p>{{config.maxUnits}}</p><br>
        </div> -->
    </div>
    <b-collapse id="collapse-2">
      <div class="p-3">
        <b-form-group label="Rubro" label-cols-sm="3" label-align-sm="right">
          <div class="pl-3">
            <b-form-select
              id="cmbRubros"
              v-model="selectedRubro"
              :options="lstRubros"
              value-field="id"
              text-field="description"
              @change="cmbRubroChange()"
            >
              <template #first>
                <b-form-select-option :value="null"
                  >Seleccione una Opcion
                </b-form-select-option>
              </template>
            </b-form-select>
          </div>
        </b-form-group>
        <b-form-group label="Sub Rubro" label-cols-sm="3" label-align-sm="right">
          <div class="pl-3">
            <b-form-select
              v-model="selectedSubRubro"
              :options="lstFilteredSubRubros"
              value-field="id"
              text-field="description"
              @change="cmbSubRubroChange()"
            ></b-form-select>
          </div>
        </b-form-group>
        <b-form-group label="Producto" label-cols-sm="3" label-align-sm="right">
          <div class="pl-3">
            <multiselect v-model="selectedProducts" :options="lstFilteredProducts" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Seleccione Productos" label="description" track-by="id" :preselect-first="true">
              <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values && values.length && !isOpen">{{ values.length }} seleccionados</span></template>
            </multiselect>
          </div>
        </b-form-group>
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
        <div class="container">
          <div class="row">
            <b-form-group
              label="subRubro"
              label-cols-sm="3"
              label-align-sm="right"
              class="col"
            >
              <div class="pl-3 col-4">
                <b-form-select
                  v-model="selectedSubRubro2"
                  :options="lstFilteredSubRubros"
                  value-field="id"
                  text-field="description"
                ></b-form-select>
              </div>
            </b-form-group>
          </div>
          <div class="row">
            <b-form-group
              label="subRubro"
              label-cols-sm="3"
              label-align-sm="right"
              class="col"
            >
              <div class="pl-3 col-4">
                <b-form-select
                  v-model="selectedSubRubro3"
                  :options="lstFilteredSubRubros"
                  value-field="id"
                  text-field="description"
                ></b-form-select>
              </div>
            </b-form-group>
          </div>
          <div class="row">
            <b-form-group
              label="subRubro"
              label-cols-sm="3"
              label-align-sm="right"
              class="col"
            >
              <div class="pl-3 col-4">
                <b-form-select
                  v-model="selectedSubRubro4"
                  :options="lstFilteredSubRubros"
                  value-field="id"
                  text-field="description"
                ></b-form-select>
              </div>
            </b-form-group>
          </div>
          <div>
            <center>
            <b-button @click="addConfig" variant="primary">Confirmar Configuración</b-button>
            <b-button variant="light">Cancelar</b-button>
            </center>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {Multiselect},
  name: "crudpromotions",
  props: {
    newPromotion: true,
    lstProducts: null,
    lstBehaviours: null,
    lstRubros: null,
    lstSubRubros: null,
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
      promotionsConfig: [
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
      lstFilteredSubRubros: null,
      lstFilteredProducts: [],
      selectedTurno: 0,
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
      selectedRubro: 0,
      selectedSubRubro: 0,
      selectedSubRubro2: 0,
      selectedSubRubro3: 0,
      selectedSubRubro4: 0,
      selectedProducts: [],
    };
  },
  mounted() {
    if (this.newPromotion) {
      this.currentPromotions.id = 0;
      this.currentPromotions.description = "";
      this.currentPromotions.extendedDescription = "";
      this.currentPromotions.activeFrom = new Date();
    }
    this.selectedRubro = null;
    this.cmbRubroChange();
  },

  methods: {
    cmbRubroChange() {
      let sr = this.lstSubRubros.filter((x) => x.rubroId == this.selectedRubro);
      this.lstFilteredSubRubros = sr;
      this.selectedSubRubro = null;
      this.filterProducts(this.selectedRubro, null);
    },

    cmbSubRubroChange() {
      this.filterProducts(this.selectedRubro, this.selectedSubRubro);
    },

    filterProducts(rubroid, subrubroid) {
      let sr = [];
      if (subrubroid && rubroid) {
        sr = this.lstProducts.filter(
          (x) =>
            x.subRubro != null &&
            x.subRubro.id == subrubroid &&
            x.rubro.id == rubroid
        );
      } else if (rubroid && !subrubroid) {
        sr = this.lstProducts.filter((x) => x.rubro.id == rubroid);
      }
      this.lstFilteredProducts = sr;
      this.selectedProducts = [];
    },
    addConfig(){
      console.log(this.selectedProducts);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
ul.ks-cboxtags {
  list-style: none;
  padding: 20px;
}
ul.ks-cboxtags li {
  display: inline;
}
ul.ks-cboxtags li label {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(139, 139, 139, 0.3);
  color: #adadad;
  border-radius: 25px;
  white-space: nowrap;
  margin: 3px 0px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s;
}

ul.ks-cboxtags li label {
  padding: 8px 12px;
  cursor: pointer;
}

ul.ks-cboxtags li label::before {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 12px;
  padding: 2px 6px 2px 2px;
  content: "\f067";
  transition: transform 0.3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked + label::before {
  content: "\f00c";
  transform: rotate(-360deg);
  transition: transform 0.3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked + label {
  border: 2px solid #1bdbf8;
  background-color: #12bbd4;
  color: #fff;
  transition: all 0.2s;
}

ul.ks-cboxtags li input[type="checkbox"] {
  display: absolute;
}
ul.ks-cboxtags li input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}
ul.ks-cboxtags li input[type="checkbox"]:focus + label {
  border: 2px solid #e9a1ff;
}
</style>