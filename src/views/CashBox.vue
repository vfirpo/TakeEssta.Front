<template>
  <div>
    <div style="border-radius: 4px; padding: 10px; background-color: #cc0000">
      <h3 style="color: #fff">Ventas - Vista de Caja</h3>
    </div>
    <div>
    <b-button-group class="col-11 pt-4">
      <b-button class="col-2">Detalle de Movimientos</b-button>
      <b-button class="col-2">Comandas</b-button>
      <b-button class="col-2">Gastos</b-button>
      <b-button class="col-2">Ingresos</b-button>
      <b-button class="col-2">Egresos</b-button>
      <b-button class="col-2">Sueldos</b-button>
    </b-button-group>
    </div>

<table class="table table-striped table-condensed table-hover">
    
    <thead>
      <tr>
        <th></th>
        <th>Saldo deudor</th>
        <th>Saldo acreedor</th>
        <th></th>
      </tr>
    </thead>
    
    <tbody>
      
          
    <tr>
      <td><b>Dinero al inicio</b></td>
      <td></td>
      <td><i class="fas fa-chevron-circle-up txtVerde" style="margin-right: 5px;"></i>$ {{ cashBoxToView.inicioDeCaja }}</td>
      <td></td>
    </tr>
    
	    	
    <tr>
      <td><b>Total de ventas</b> <br> 
        <span class="txtVerde"><i class="far fa-check-circle"></i> 66 Comandas confirmadas</span> 
        <br> 
        <span class="txtRojo"><i class="far fa-times-circle"></i> 0 Comandas anuladas</span>
      </td>
      
            <td></td>
        <td><i class="fas fa-chevron-circle-up txtVerde" style="margin-right: 5px;"></i>$82626<div style="margin-left: 20px;" onclick="fcn_abrir_resumen();" class="pointer" title="Ver detalle formas de pago"> <div class="Font12 txtBlueCool"><i class="fas fa-money-bill" style="color: #673ab7;"></i> $58101</div> <div class="Font12 txtBlueCool"><i class="far fa-credit-card" style="color: #337ab7;"></i> $24525</div></div></td>
      	<td><a href="index.php?action=3&amp;subaction=ve_02&amp;subsection=tomar_pedidos_v3.0/ve_comandas&amp;cod_ventas=79710">Ver detalle</a></td>
            
    </tr>

	    	
      	
    <tr>
      <td><b>Total de ingresos</b></td>
      <td></td>
      <td><i class="fas fa-chevron-circle-up txtVerde" style="margin-right: 5px;"></i>$2447</td>
      <td><a href="index.php?action=3&amp;subaction=ve_02&amp;subsection=ve_ingresos&amp;cod_ventas=79710">Ver detalle</a></td>
    </tr>
      
	    	
        
    <tr>
      <td><b>Total de gastos</b></td>
      <td><i class="fas fa-minus-circle txtBlueCool" style="margin-right: 5px;"></i>$0</td>
      <td></td>
      <td><a href="index.php?action=3&amp;subaction=ve_02&amp;subsection=ve_gastos&amp;cod_ventas=79710">Ver detalle</a></td>
    </tr>

	    	
      	
    <tr>
      <td><b>Total de egresos</b></td>
      <td><i class="fas fa-chevron-circle-down txtRojo" style="margin-right: 5px;"></i>$-54100</td>
      <td></td>
      <td><a href="index.php?action=3&amp;subaction=ve_02&amp;subsection=ve_egresos&amp;cod_ventas=79710">Ver detalle</a></td>
    </tr>
    
	    	
      
    <tr>
      <td><b>Total pagos de sueldo</b></td>
      <td><i class="fas fa-chevron-circle-down txtRojo" style="margin-right: 5px;"></i>$-5248</td>
      <td></td>
      <td><a href="index.php?action=3&amp;subaction=ve_02&amp;subsection=ve_sueldos&amp;cod_ventas=79710">Ver detalle</a></td>
    </tr>
  
	  
        
    
    <tr>
      <td><strong>Totales</strong></td>
      <td><i class="fas fa-chevron-circle-down txtRojo" style="margin-right: 5px;"></i><strong>$-59348</strong></td>
      <td><i class="fas fa-chevron-circle-up txtVerde" style="margin-right: 5px;"></i><strong>$85343<div style="margin-left: 20px;"> <div class="Font12 txtBlueCool"><i class="fas fa-money-bill" style="color: #673ab7;"></i> $60818</div> <div class="Font12 txtBlueCool"><i class="far fa-credit-card" style="color: #337ab7;"></i> $24525</div></div></strong></td>
      <td></td>
    </tr>
    
	      </tbody>
  </table>




  </div>
</template>

<script>
export default {
    name: "cashBox",

    data(){
        return {
            cashBoxToView: Object,
        }
    },

    mounted() {
        let cashBoxId = this.$route.params.id;
        let ret = this.getCashBox(cashBoxId);
        this.cashBoxToView = ret;
        console.log(this.cashBoxToView);
    },

    methods: {
        async getCashBox(id){
           let resp = await this.$global.callGetAPI('Cajas/GetById', {params: { idCaja: id }})
           if (resp.items.count() > 0) {
               return resp.items[0];
           }
           else{
               throw resp.message;
           }
       },
    }

}
</script>

<style>

</style>