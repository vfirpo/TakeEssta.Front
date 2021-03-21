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
    <div class="container">
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
          <div class="col-3">
            <p>Color:</p>
            <b-form-input id="color" type="color"></b-form-input>
          </div>
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
    return {};
  },
};
</script>

<style>
</style>