
const cds = require('@sap/cds');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
// Middleware to parse JSON bodies 
app.use(express.json());
// Your route handling code goes 

//const GWSAMPLE = require('./external/GWSAMPLE.csn');
const { ConnectBackend } = require('./lib/ConnectionHandler');

const LOG = cds.log('my-service-logger');
const { log } = require("console");



class CatalogService extends cds.ApplicationService {
    init() {

        this.on('submitOrder', this.Validatestock);
        return super.init();
    }


    Validatestock(req) {



        const { Books } = this.entities;
        const { ID, stock } = req.data;

        log("Starting CAP_DOX Extraction--ID ", req.data.ID);

        

        INSERT.into(Books).entries({

            ID: ID,
            stock: stock,
            title: "CAPM js"

        });

        if (stock < 1) {
            return req.error('The quantity must be at least 1.');
        }

        let stock1 = 10;

        return { stock };



    }


}

module.exports = CatalogService;

class SalesOrderService extends cds.ApplicationService {

    

    async init() {
        this.on('createSalesOrder', this.createSalesOrder);  

        this.on('uploadFile', async (req) => {

             log('Inside  uploadFile .');


    const fileContent = req.data.file; 
    // Process the fileContent here (e.g., save to database, send to external service)
       log("Received file content:", fileContent);
    // Add your logic for handling the uploaded file
    return "File uploaded successfully!";
  });
        
        

        return await super.init();
    }

    async createSalesOrder(req) {
        log('Inside  createSalesOrder .');


        //    try {
        //         const bpaService = await cds.connect.to('bpa_service'); // Connect to the destination

        //          var startContext = { "POId": "300001999" };
        //          var workflowStartPayload = { definitionId: "com.demowf", context: startContext }

        //         const payload = {
        //             definitionId: "your_workflow_definition_id", // Replace with your workflow's definition ID
        //             context: {
        //                 // Pass any required input parameters for your workflow
        //                 "inputParameter1": "value1",
        //                 "inputParameter2": 123
        //             }
        //         };

        //         const response = await bpaService.send('POST', '/v1/workflow-instances', JSON.stringify(workflowStartPayload), {
        //             'Content-Type': 'application/json'
        //         });

        //         if (response.status !== 201) {
        //             throw new Error(`Failed to trigger workflow: ${response.statusText}`);
                    
        //         }

        //         return { message: "Workflow triggered successfully!", instanceId: response.id };
                

        //     } catch (error) {
        //         console.error("Error triggering workflow:", error);
        //         req.error(500, `Failed to trigger workflow: ${error.message}`);
        //     }





        const { SalesOrders } = this.entities;
        //const { SalesType, SalesOzation} = req.data;

        await INSERT.into(SalesOrders).entries({

            SalesOrderType: "WF",
            SalesOrganization: "9991"

        });





    }

    // end of create sales order


}
module.exports = SalesOrderService;


// class ProductCatalogService extends cds.ApplicationService {


  


//      async init() {
//         this.on('READ', this.ReadData);
//         return await super.init();
//     }

//     async ReadData(req) {
      
//        //  const backendconnnect = await cds.connect.to('GWSAMPLE');


//         // onst backendconnnect = await cds.connect.to('GWSAMPLE');
//         //    const tx  = backendconnnect.tx(req);
//         //    backendconnnect.run(SELECT.from('ProductSet'));
//         //   tx.run(req.query);
//          // const { ProductList } = backendconnnect.entities; 
          
//           // const externalData = await backendconnnect.run(SELECT.from('ProductSet')); // Assuming 'Products' is the entity in external service
//           //return result = await backendconnnect.run(SELECT(ProductList));

//     }


// }

// module.exports = ProductCatalogService;


//  module.exports = cds.service.impl(async function() {
//          const { ProductList } = this.entities;

// //         // Implement a custom handler for reading data from the external source
//           this.on('READ', ProductList, ConnectBackend);


// });











//   module.exports = cds.service.impl(async function() {
//         const { ProductList } = this.entities;

//         // Implement a custom handler for reading data from the external source
//         this.on('READ', ProductList, async (req) => {
//             // Replace with your actual logic to fetch data from the external system
//             const externalData = [
//                 { ID: 1, name: 'Product A' },
//                 { ID: 2, name: 'Product B' }
//             ];
//             return externalData;
//         });

//         // You would implement similar handlers for CREATE, UPDATE, DELETE if needed
//         // this.on('CREATE', ProductList, async (req) => { ... });
//         // this.on('UPDATE', ProductList, async (req) => { ... });
//         // this.on('DELETE', ProductList, async (req) => { ... });
//     });module.exports = cds.service.impl(async function() {
//         const { ProductList } = this.entities;

//         // Implement a custom handler for reading data from the external source
//         this.on('READ', ProductList, async (req) => {
//             // Replace with your actual logic to fetch data from the external system
//             const externalData = [
//                 { ID: 1, name: 'Product A' },
//                 { ID: 2, name: 'Product B' }
//             ];
//             return externalData;
//         });

        // You would implement similar handlers for CREATE, UPDATE, DELETE if needed
        // this.on('CREATE', ProductList, async (req) => { ... });
        // this.on('UPDATE', ProductList, async (req) => { ... });
        // this.on('DELETE', ProductList, async (req) => { ... });
  //  });


    // module.exports = async (srv) => {
    //     const { ProductList } = srv.entities;
    //     const externalService = await cds.connect.to(GWSAMPLE);

    //     srv.on('READ', ProductList, async (req) => {
    //         // Forward the read request to the external service
    //         return externalService.run(req.query);
    //     });

    //     // You can add handlers for other operations like CREATE, UPDATE, DELETE if needed
    // };

// class ProductCatalogService extends cds.ApplicationService {

//     async init() {
//         this.on('createSalesOrder1', this.createSalesOrder1);
//         return await super.init();
//     }


// }

// module.exports = ProductCatalogService;




