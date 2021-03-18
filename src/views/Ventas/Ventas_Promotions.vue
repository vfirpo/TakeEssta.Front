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
      <button class="rounded-pill shadow p-2" type="button">
        <i class="fas fa-sync-alt"></i>
        Actualizar Grilla
      </button>
    </div>
    <div class="p-3">
      <label for="search"><strong>Buscar: </strong></label>
      <input type="search" id="search" class="rounded-lg shadow p-2" />
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
            <tr v-for="item in items.items" :key="item.id">
              <td>
                {{ item.id }}
              </td>
              <td>
                {{ item.Descripcion }} <br>
                {{ item.extendedDescription }}
              </td>
              <td>
                {{ item.desde }}
              </td>
              <td>
                {{ item.hasta }}
              </td>
              <td>
                {{ item.color }}
              </td>
              <td>
                {{ item.turno }}
              </td>
              <td>
                {{ item.precio }}
              </td>
              <td>
                {{ !item.sucursalId ? "Global" : sucursalDescription }}
              </td>
              <td>
                {{ item.imagen }}
              </td>
              <td>
                <div v-if="item.sucursalId">
                  <b-button
                    class="btn-xs btn-warning xs"
                    @click="editThisPromo(item.id)"
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
  </div>
</template>

<script>
import pagination from "@/components/Pagination.vue";

export default {
  components: {
    pagination,
  },
  name: "promotions",
};
</script>

<style>
</style>