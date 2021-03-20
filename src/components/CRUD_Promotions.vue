<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-2">
        <p>Titulo</p>
      </div>
      <div class="col-6">
        <input class="ml-auto rounded form-control" type="text" aria-label="Sizing example input" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-2">
        <p>Descripcion</p>
      </div>
      <div class="col-6">
        <input class="ml-auto rounded form-control" type="text" aria-label="Sizing example input"/>
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