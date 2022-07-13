const express = require('express');
const app     = express();
const fs      = require('fs');

let RNC = [];
app.get('/', function (req,res) {
    res.sendFile(__dirname + '/index.html');
   
});

app.get('/rnc/id=:id',(req,res) =>{
    const id = (req.params.id);
    var some = fs.readFileSync('./DGII_RNC.TXT', 'utf-8');

    let rnc = null;    //objeto
    // let rnc = [];     // array
    if(id.length>= 9 && id.length < 12  && isNaN(id) == false){

    if(some.indexOf(id) != -1){
        var elindex = some.indexOf(id);
        var texto   = '';

         for (let i = elindex; i < (elindex +200); i++) {
             texto += some.charAt(i);
            
             if ((texto.indexOf('|NORMAL')!= -1) && (rnc == null))           //objeto
            // if ((texto.indexOf('|NORMAL')!= -1) && (rnc[0] == null))     //array
            {
                var arra = texto.split('|');
                
                var rncjs = {
                    status              : true,
                    rnc	                : arra[0],
                    nombre	            : arra[1],
                    nombre_comercial	: arra[2],
                    cctividad_economica : arra[3],
                    categoria           : arra[4],
                    fecha               : arra[8],
                    estado	            : arra[9],
                    regimen_de_pago	    : arra[10]
                };
                
                rnc = rncjs;      //objeto
                // rnc.push(rncjs);     //array
            }
            if(rnc != null)          //objeto
            // if(rnc[0] != null)       //array
             {
                 break;
             }
         }
    
    }
        else{
            rnc = {status: false}            //objeto
            // rnc = ['No existe dicho rnc']       //array
        }
        
    }
    else{
         rnc = {status: false}            //objeto
        //  rnc = ['No existe dicho rnc']       //array

    }

    res.send(rnc)
  
});


const port = process.env.port || 3000;
app.listen(port, console.log('Server on port ' + port))