import axios from 'axios';

export var Global = {
    urlAPI: "http://localhost:8080/api/",


    callGetAPI: async function(EndPoint, params){
        let r;
        await axios
        .get(this.urlAPI + EndPoint, params)
        .then(resp => {
            if (resp.status == 200)
            {
                r = resp.data;
            }
        })
        .catch((e) => alert('Fatal ERROR from services:  ' + e.message));

        return r;
    },

    callPostAPI: async function(EndPoint, params){
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
            else{
                alert('Fatal ERROR from services')
            }
        })
        .catch((e) => console.log(e));
        return r;
    },


    formatDate: function(value){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(value).toLocaleDateString("en-US", options); 
    },
    exportTableToExcel: function (tableID, filename){
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
