<template>
  <div>
    <div style="border-radius: 4px; padding: 10px; background-color: #cc0000">
      <h3 style="color: #fff">Ventas - Promociones</h3>
    </div>
    <div class="row justify-content-center pt-2">
      <div class="p-3">
        <div class="border border-5 border-dark p-1 rounded shadow">
          <b-form-checkbox
            id="checkbox-1"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
          >
            Mostrar Promociones Vencidas
          </b-form-checkbox>
        </div>
      </div>
      <div class="p-3">
        <div class="border border-5 border-dark p-1 rounded shadow">
          <b-form-checkbox
            id="checkbox-2"
            name="checkbox-2"
            value="accepted"
            unchecked-value="not_accepted"
          >
            Mostrar Promociones a Futuro
          </b-form-checkbox>
        </div>
      </div>
    </div>
    <div>
      <button class="rounded-pill shadow p-2" type="button" @click="getPromotions">
        <i class="fas fa-sync-alt"></i>
        Actualizar Grilla
      </button>
    </div>
    <div class="p-3 row justify-content-center">
      <label for="search"><strong>Buscar: </strong></label>
      <div class="pl-4">
        <input type="search" id="search" class="rounded-lg shadow p-2" />
      </div>
    </div>
    <div class="p-2">
      <button
        type="button"
        class="rounded-pill shadow p-2"
        @click="addPromotions()"
      >
        Hacer Promocion
      </button>
      <!-- Inicio HTML Modal -->
      <b-modal id="crud_Promotions_modal" size="lg" title="Large Modal">
        <crudpromotions
          :lstRubros="lstRubros"
          :lstSubRubros="lstSubRubros"
          :lstBehaviours="lstBehaviours"
          :lstProducts="lstProducts"
          :newPromotion="newPromotions"
          :currentPromotions="itemToChange"
      /></b-modal>
      <!-- Fin HYML Modal -->
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
              <th>Valida Desde</th>
              <th>Valida Hasta</th>
              <th>Color</th>
              <th>Turno</th>
              <th>Precio</th>
              <th>Sucursal</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody v-if="items">
            <tr v-for="item in items" :key="item.id">
              <td>
                {{ item.id }}
              </td>
              <td>
                {{ item.code }}
              </td>
              <td>
                {{ item.description }} <br />
                <label style="font-size: x-small">{{
                  item.extendedDescription
                }}</label>
              </td>
              <td>
                {{ new Date(item.activeFrom).toLocaleDateString() }}
              </td>
              <td>
                {{ new Date(item.activeTo).toLocaleDateString() }}
              </td>
              <td>
                {{ item.color }}
              </td>
              <td>
                {{ item.turno }}
              </td>
              <td>
                {{ item.price }}
              </td>
              <td>
                {{ !item.sucursal.id ? "Global" : item.sucursal.description }}
              </td>
              <td>
                {{ item.image }}
              </td>
              <td>
                <div v-if="item.sucursal.id">
                  <b-button
                    class="btn-xs btn-warning xs"
                    @click="editThisPromo(item.id)"
                    ><i class="fas fa-edit" /> Editar</b-button
                  ><br />
                  <b-button
                    class="btn-xs btn-danger xs"
                    @click="deleteThisPromo(item.id)"
                    ><i class="fas fa-trash-alt" /> Eliminar</b-button
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/Pagination.vue";
import crudpromotions from "@/components/CRUD_Promotions.vue";

export default {
  components: {
    pagination,
    crudpromotions,
  },
  name: "promotions",

  data() {
    return {
      lstProducts: [],
      lstRubros: [],
      lstSubRubros: [],
      lstBehaviours: [],
      items: [],
      newPromotions: Boolean,
      itemToChange: Object,
    };
  },

  async created() {
    await this.getProducts();
    await this.getRubros();
    await this.getSubRubros();
    await this.getBehaviours();
    await this.getPromotions();
  },

  methods: {
    async addPromotions() {
      this.newPromotions = true;
      this.itemToChange = new Object();
      this.$bvModal.show("crud_Promotions_modal");
    },

    async cancelEdition() {
      this.$bvModal.hide("crud_Promotions_modal");
    },

    async getProducts() {
      let params = "?sucursalId=" + this.$global.getCurrentUser().sucursal.id;

      let ret = await this.$global.callGetAPI(
        "Products/GetBySucursal" + params
      );
      this.lstProducts = ret.items;
    },

    async getPromotions() {
      let params = "?sucursalId=" + this.$global.getCurrentUser().sucursal.id;
      params += "&activeOnly=false";

      let ret = await this.$global.callGetAPI(
        "Promotions/GetPromotions" + params
      );
      this.items = ret.items;
    },

    async getRubros() {
      let ret = await this.$global.callGetAPI("TableProperties/GetRubros");
      this.lstRubros = ret.items;
    },

    async getSubRubros() {
      let ret = await this.$global.callGetAPI("TableProperties/GetSubRubros");
      this.lstSubRubros = ret.items;
    },

    async getBehaviours() {
      let ret = await this.$global.callGetAPI("Behaviours/GetAll");
      this.lstBehaviours = ret.items;
    },
    editThisPromo(promotionsId){
      let prom = this.items.filter(x => x.id == promotionsId)[0]
      this.newPromotions = false;
      this.itemToChange = prom;
      this.$bvModal.show("crud_Promotions_modal");
    },
  },
};
</script>

<style>
</style>