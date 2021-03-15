<template>
  <div>
    <div style="border-radius: 4px; padding: 10px; background-color: #cc7a29;">
      <h3 style="color: #fff">Productos - Ver Productos</h3>
    </div>
    <div style="text-align: center">
      <div class="container">
        <div class="row mt-3">
          <div class="col-3"></div>
            <strong><label class="mt-1" for="subRubro">Filtros</label></strong>
          <div class="col-3">
            <b-form-select id="subRubro" v-model="selectedRubro" :options="lstRubros" class="mb-3" value-field="id" text-field="description" disabled-field="notEnabled" @change="cmbRubroChange()">
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null"
                  >Rubros (TODOS)</b-form-select-option
                >
              </template>
            </b-form-select>
            </div>
            <div class="col-3">
            <b-form-select
              v-model="selectedSubRubro"
              :options="lstFilteredSubRubros"
              class="mb-3"
              value-field="id"
              text-field="description"
              disabled-field="notEnabled"
               @change="cmbSubRubroChange()"
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null"
                  >Seleccione un Sub Rubro</b-form-select-option
                >
              </template>
            </b-form-select>
          </div>
          <div class="col-3"></div>
        </div>
      </div>
      <div style="padding: 10px">
        <b-button class="bg-success" @click="addProducts()">
          <i class="fas fa-plus-circle"></i> Agregar Producto
        </b-button>
        <br />
        <div class="container w-50 pt-3">
          <b-alert
            :show="alert.seconds"
            dismissible
            fade
            variant="danger"
            @dismiss-count-down="countDownChanged"
            ><i class="fas fa-exclamation-triangle"></i>
            {{ alert.text }}
          </b-alert>
        </div>
        <h4>
          Mostrando pagina {{ this.currentPage }} de {{ this.totalPages }}
        </h4>
      </div>
      <div class="row justify-content-center">
        <div class="col-11">
          <table
            id="TablaCajas"
            class="table table-striped table-condensed table-hover"
            style="width: 100%"
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Code</th>
                <th>Descripcion</th>
                <th>U.M.</th>
                <th>Stock</th>
                <th>Rubro</th>
                <th>Sub Rubro</th>
                <th>Marca</th>
                <th>Sucursal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody v-if="items">
              <tr v-for="item in items.items" :key="item.id">
                <td>
                  {{ item.id }}
                </td>
                <td>
                  {{ item.code }}
                </td>
                <td>
                  {{ item.extendedDescription }}
                </td>
                <td>
                  {{ item.unit.description }}
                </td>
                <td>
                  {{ item.stock }}
                </td>
                <td>
                  {{ item.rubro.description }}
                </td>
                <td>
                  {{ (item.subRubro == null) ? '' : item.subRubro.description }}
                </td>
                <td>
                  {{ item.productBrand.description }}
                </td>
                <td>
                  {{ !item.sucursalId ? "Global" : sucursalDescription }}
                </td>
                <td>
                  <div v-if="item.sucursalId">
                    <b-button
                      class="btn-xs btn-warning xs"
                      @click="editThisProduct(item.id)"
                      ><i class="fas fa-edit" /> Editar</b-button
                    ><br />
                    <b-button
                      class="btn-xs btn-danger xs"
                      @click="deleteThisProduct(item.id)"
                      ><i class="fas fa-trash-alt" /> Eliminar</b-button
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-11">
          <div class="overflow-auto">
            <pagination
              :totalPages="this.totalPages"
              @pageSelected="getProducts"
            ></pagination>
          </div>
        </div>
      </div>
      <b-button class="bg-info" @click="toExcel('TablaCajas')"
        ><i class="fas fa-file-excel" /> Export to Excel</b-button
      >
    </div>
    <!-- Modal para confirmar borrar Productos -->
    <b-modal
      id="my-confirm-modal"
      size="sm"
      ref="my-confirm-modal"
      hide-footer
      hide-header-close
      no-close-on-esc
      no-close-on-backdrop
    >
      <b-container fluid class="text-center">
        <i
          style="margin: 10px"
          class="fas fa-question-circle animated infinite pulse Font30 txtNaranja"
        ></i>
        <h5>
          Confirma que desea eliminar el producto
          <strong>{{
            itemToChange ? itemToChange.extendedDescription : ""
          }}</strong
          >?
        </h5>
        <template>
          <b-button class="p-2 m-2" variant="danger" @click="confirmDelete()">
            Eliminar
          </b-button>
          <b-button class="p-2 m-2" variant="success" @click="closeModal()">
            Cancelar
          </b-button>
        </template>
      </b-container>
    </b-modal>
    <!-- END Modal confirmar borrar Productos -->
    <!-- Modal alta y modificacion de Productos -->
    <b-modal id="my-CRUD-modal"
      size="md"
      ref="my-CRUD-modal"
      hide-footer
      hide-header-close
      no-close-on-esc
      no-close-on-backdrop>
      <crudProducts :currentProduct="itemToChange" :lstRubros="lstRubros" :lstSubRubros="lstSubRubros" 
      :lstMarcas="lstMarcas" :lstUnits="lstUnits" :newProduct="newProduct" :lstBehaviours="lstBehaviours" @cancelEdition="cancelEdition()" />
    </b-modal>

    <!-- END Modal alta y modificacion de Productos -->
  </div>
</template>

<script>
import pagination from "@/components/Pagination.vue";
import crudProducts from '../components/CRUD_Products.vue';

export default {
  components: {
    pagination,
    crudProducts,
  },

  name: "products",

  data() {
    return {
      items: null,
      currentPage: 1,
      pageSize: 18,
      totalPages: 0,
      sucursal: 0,
      sucursalDescription: "",
      alert: { text: "", visible: false, seconds: 0 },
      itemToChange: Object,
      lstBehaviours: null,
      lstRubros: null,
      selectedRubro: null,
      selectedSubRubro: null,
      lstSubRubros: null,
      lstFilteredSubRubros: null,
      lstMarcas: null,
      lstUnits: null,
      newProduct: false,
    };
  },

  beforeMount() {
    var user = this.$global.getCurrentUser();
    this.sucursal = user.sucursal.id;
    this.sucursalDescription = user.sucursal.description;
    this.getProducts(0);
    this.getRubros();
    this.getSubRubros();
    this.getProductsBrands();
    this.getUnits();
    this.getBehaviours();
  },

  methods: {
    async getProducts(page) {
      if (page > 0) {
        this.currentPage = page;
      }
      
      let params =
        "?sucursalId=" +
        this.sucursal +
        "&PageSize=" +
        this.pageSize +
        "&CurrentPage=" +
        this.currentPage ;

        if (this.selectedRubro != null)
        {
          params += "&rubroId=" + this.selectedRubro;
          if (this.selectedSubRubro != null)
          {
            params += "&subRubroId=" + this.selectedSubRubro;
          }
        }
      var ret = await this.$global.callGetAPI("Products/GetToList" + params);
      if (ret != null)
      {
        this.totalPages = Math.ceil(ret.recordCounts / this.pageSize);
        this.items = ret;
      }
      else {this.totalPages = 0 }
    },

    async getRubros() {
      var lstRubros = await this.$global.callGetAPI(
        "TableProperties/GetRubros"
      );
      this.lstRubros = lstRubros.items;
    },

    async getSubRubros() {
      var lstSubRubros = await this.$global.callGetAPI(
        "TableProperties/GetSubRubros"
      );
      this.lstSubRubros = lstSubRubros.items;
    },

    async getProductsBrands() {
      var lstMarcas = await this.$global.callGetAPI(
        "TableProperties/GetProductBrands"
      );
      this.lstMarcas = lstMarcas.items;
    },    
    async getUnits() {
      var lstUnits = await this.$global.callGetAPI(
        "TableProperties/GetAllUnits"
      );
      this.lstUnits = lstUnits.items;
    },    

    async getBehaviours() {
        var lstBehaviours = await this.$global.callGetAPI(
          "Behaviours/GetAll"
        );
        this.lstBehaviours = lstBehaviours.items;
    },    

    closeModal() {
      this.$bvModal.hide("my-confirm-modal");
    },

    async confirmDelete() {
      await this.$global.callPutAPI("Products/ActiveDesactive", {
        productId: this.itemToChange.id,
      });

      this.$bvModal.hide("my-confirm-modal");

      await this.getProducts(0);
    },

    toExcel(val) {
      this.$global.exportTableToExcel(val);
    },

    deleteThisProduct(idProducto) {
      var itemToChange = this.items.items.filter(
        (prod) => prod.id == idProducto
      );
      this.itemToChange = itemToChange[0];
      this.$bvModal.show("my-confirm-modal");
    },

    cmbRubroChange() {
      var sr = this.lstSubRubros.filter((x) => x.rubroId == this.selectedRubro);
      this.lstFilteredSubRubros = sr;
      this.selectedSubRubro = null;
      this.getProducts(0);
    },

    cmbSubRubroChange() {
      this.getProducts(0);
    },

    countDownChanged(dismissCountDown) {
      this.alert.seconds = dismissCountDown;
    },
    /* funciones del modal de alta y edicion de productos */
    editThisProduct(idProduct){
      this.newProduct = false;
      this.itemToChange = this.items.items.filter(x => x.id == idProduct)[0]
      this.$bvModal.show("my-CRUD-modal");

    },

    async addProducts() {
      this.newProduct = true;
      this.itemToChange = new Object;
      this.$bvModal.show("my-CRUD-modal");
    },

    async cancelEdition() {
      this.$bvModal.hide("my-CRUD-modal");
    },

    /* FIN de funciones del modal de alta y edicion de productos */
  },
};
</script>

<style>
</style>