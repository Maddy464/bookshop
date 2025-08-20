namespace my.bookshop;

using { managed } from '@sap/cds/common';

entity MediaFile : managed {
  key ID       : UUID @(Core.Computed: true);
 
}

entity Books {
  key ID    : Integer;
      title : String;
      stock : Integer;
}

entity UserData {

      UserName  : String;
  key FirstName : String;
  key LastName  : String;
      Age       : Integer;

}

entity Products {
  key ID          : UUID;
      ProductName : String;
      Price       : Decimal;
      Currency    : String;
}

entity SalesOrders {
  key ID                : UUID;
      SalesOrderType    : String;
      SalesOrganization : String;
      to_Items          : Association to many SalesOrderItems
                            on to_Items.parent = $self;
}

entity SalesOrderItems {
  key ID                : UUID;
      parent            : Association to SalesOrders;
      Material          : String;
      RequestedQuantity : Integer;
}
