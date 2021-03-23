import axios from 'axios';

export var Global = {
     urlAPI: "http://localhost:8080/api/",
     //urlAPI: "http://192.168.1.27:9090/api/",

     setCurrentCashBox(cashBox){
        sessionStorage.setItem("CURRENT_CASH_BOX", JSON.stringify(cashBox));
     },

     async getCurrentCashBox(){
        let r = JSON.parse(sessionStorage.getItem("CURRENT_CASH_BOX"));
        if (r) {return r;}
        else { 

            var sucId = this.getCurrentUser().sucursal.id;


            var val = await this.callGetAPI("Cajas/GetLast?sucursal=" + sucId);


            if (val && val.items[0]) {
                this.setCurrentCashBox(val.items[0]);
                
                return val.items[0];
            }
            return null;
        }
     },

     setCurrentUser(user){
        sessionStorage.setItem("USER", JSON.stringify(user));
    },

     getCurrentUser(){
        let r = JSON.parse(sessionStorage.getItem("USER"));
        if (r) {return r;}
        else { sessionStorage.removeItem("USER"); }
    },

     async callGetAPI(EndPoint, params){
        let r = await axios
        .get(this.urlAPI + EndPoint, params, {
            headers: {
                'Content-Type': 'application/json'
            }})
        .catch((e) => alert('Fatal ERROR from services:  ' + e.message));

        return r.data;
    },

    async callPostAPI(EndPoint, params){
        let r;
        await axios
        .post(this.urlAPI + EndPoint, params,  {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => {
            if (resp.status == 200)
            {
                r = resp.data;
            }
        })
        .catch((e) => alert('Fatal ERROR from services:  ' + e.message));
        return r;
    },

    async callPutAPI(EndPoint, params){
        let r;
        await axios
        .put(this.urlAPI + EndPoint, params,  {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => {
            if (resp.status == 200)
            {
                r = resp.data;
            }
        })
        .catch((e) => alert('Fatal ERROR from services:  ' + e.message));
        return r;
    },

    formatDate(value){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(value).toLocaleDateString("es-AR", options); 
        //return new Date(value).toLocaleDateString(); 
    },
    exportTableToExcel(tableID, filename){
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
        
        // Specify file name
        filename = filename?filename+'.xls':'excel_data.xls';
        
        // Create download link element
        downloadLink = document.createElement("a");
        
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }
    }


}
