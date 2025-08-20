using  my.bookshop as my  from '../db/schema';

using GWSAMPLE  from './external/GWSAMPLE';

service CatalogService {

 @odata.draft.enabled
 entity Books as projection on my.Books;
 entity Products as projection on my.Products;

 action publish(bookID: Integer) returns Books; // Bound to a single book

 action submitOrder(book : my.Books:ID, quantity : Integer) returns {
        stock : my.Books:stock
    };
}


service UserService {

    entity User as projection on my.UserData;   
    entity Products as projection on my.Products;

}

service SalesOrderService {

    entity Books as projection on my.Books;


    entity SalesOrders as projection on my.SalesOrders;   
    entity SalesOrderItems as projection on my.SalesOrderItems;

    action createSalesOrder( );

    action publish(bookID: Integer) returns Books; // Bound to a single book

    action applyDiscount(percentage: Integer) returns array of Books; // Unbound action

}

 service ProductCatalogService {
      entity ProductList as select from GWSAMPLE.ProductSet{
        ProductID,
        Description,
        WeightMeasure,
        WeightUnit,
        Depth,
        Height
      }


      action ReadData( );
 }



