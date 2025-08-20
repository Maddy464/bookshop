
const cds = require('@sap/cds');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
// Middleware to parse JSON bodies 
app.use(express.json());
// Your route handling code goes 

//const GWSAMPLE = require('./external/GWSAMPLE.csn');
const { ConnectBackend } = require('./lib/ConnectionHandler');




class CatalogService extends cds.ApplicationService {
    init() {

        this.on('submitOrder', this.Validatestock);
        return super.init();
    }


    Validatestock(req) {

        const { Books } = this.entities;
        const { ID, stock } = req.data;

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
        
        return await super.init();
    }


    async createSalesOrder(req) {

        const { SalesOrders } = this.entities;
        //const { SalesType, SalesOzation} = req.data;

        await INSERT.into(SalesOrders).entries({

            SalesOrderType: "CC",
            SalesOrganization: "1501"

        });





    }


}
module.exports = SalesOrderService;


class ProductCatalogService extends cds.ApplicationService {


  


     async init() {
        this.on('READ', this.ReadData);
        return await super.init();
    }

    async ReadData(req) {
      
         const backendconnnect = await cds.connect.to('GWSAMPLE');


        // onst backendconnnect = await cds.connect.to('GWSAMPLE');
        //    const tx  = backendconnnect.tx(req);
        //    backendconnnect.run(SELECT.from('ProductSet'));
        //   tx.run(req.query);
         // const { ProductList } = backendconnnect.entities; 
          
          // const externalData = await backendconnnect.run(SELECT.from('ProductSet')); // Assuming 'Products' is the entity in external service
          //return result = await backendconnnect.run(SELECT(ProductList));

    }


}

module.exports = ProductCatalogService;


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




