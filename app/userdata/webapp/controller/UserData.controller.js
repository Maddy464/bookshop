sap.ui.define([
	"sap/ui/core/Messaging",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v2/ODataModel"
], (Messaging, Controller, MessageToast, MessageBox, Sorter, Filter, FilterOperator,
	FilterType, JSONModel, ODataModel) => {
	"use strict";

	return Controller.extend("ns.userdata.controller.UserData", {


		/**
	 *  Hook for initializing the controller
	 */
		onInit: function () {



			this.oModel = this.getOwnerComponent().getModel();





			var oMessageModel = Messaging.getMessageModel(),
				oMessageModelBinding = oMessageModel.bindList("/", undefined, [],
					new Filter("technical", FilterOperator.EQ, true)),
				oViewModel = new JSONModel({
					busy: false,
					hasUIChanges: false,
					usernameEmpty: true,
					order: 0
				});

			this.getView().setModel(oViewModel, "appView");
			this.getView().setModel(oMessageModel, "message");

			oMessageModelBinding.attachChange(this.onMessageBindingChange, this);
			this._bTechnicalErrors = false;
		},

		onCapmfunction: function () {


			var oModel = this.getOwnerComponent().getModel("SalesOrderModel");

			var oListBinding = oModel.bindList("/SalesOrders");

			oModel.callFunction("/SalesOrders", {
				method: "POST",
				urlParameters: {
					SalesOrderType: "CP",
					SalesOrganization: "1900"
				},
				success: function (oData, oResponse) {
					sap.m.MessageToast.show("Record created successfully!");
					// Handle success, e.g., refresh data
				},
				error: function (oError) {
					sap.m.MessageToast.show("Error creating record: " + oError.message);
					// Handle error
				}
			});



		},

		onPublish: function () {

			const odataModel = this.getOwnerComponent().getModel("SalesOrderModel");
			// let oContext = odataModel.getBindingContext();
			//      const sActionPath = "/publish(...)"; // Construct action path

			//         odataModel.callFunction(sActionPath, {
			//     method: "POST",
			//     urlParameters: {
			//         bookID: 67 
			//     },
			//     success: function() {
			//         MessageToast.show("Book published successfully!");
			//     },
			//     error: function(oError) {
			//         MessageBox.error("Error publishing book: " + oError.message);
			//     }
			// });


			const sActionPath = "/SalesOrderService.applyDiscount"; // Direct path to unbound action

			odataModel.callFunction(sActionPath, {
				method: "POST",
				urlParameters: {
					percentage: 10 // Pass parameters
				},
				success: function () {
					MessageToast.show("Discount applied to all books!");
				},
				error: function (oError) {
					MessageBox.error("Error applying discount: " + oError.message);
				}
			});



		},


		onCapm_extenal: function (oEvent) {

			var oModel = this.getOwnerComponent().getModel("ProductCatModel");

			//  oModel = this.getView().getModel();
			let oBindList = oModel.bindList("/ProductList");

			oBindList.requestContexts().then(function (aContexts) {
				aContexts.forEach(oContext => {
					console.log(oContext.getObject());
				});
			});
		},

		onCapmaction: function (oEvent) {






			var oModel = this.getOwnerComponent().getModel("SalesOrderModel");
			var oActionODataContextBinding = oModel.bindContext("/createSalesOrder(...)"); // Use "..." for parameters


			oActionODataContextBinding.execute().then(function () {
				var oActionContext = oActionODataContextBinding.getBoundContext();
				console.log(oActionContext.getObject()); // Access the action's return value
				sap.m.MessageToast.show("Book promoted successfully!");
			}).catch(function (oError) {
				sap.m.MessageToast.show("Error promoting book: " + oError.message);
			});





			// let sActionName = "SalesOrderService.createSalesOrder";
			// let mParameters = {
			// 	contexts: oEvent.getSource().getBindingContext(),
			// 	model: oEvent.getSource().getModel(),
			// 	label: 'Confirm',	
			// 	invocationGrouping: true 	
			// };
			// this.editFlow.invokeAction(sActionName, mParameters); //SAP Fiori elements EditFlow API
			// MessageToast.show("Custom handler invoked.");

			// var oModel = this.getOwnerComponent().getModel("SalesOrderModel");

			// var oListBinding = oSecondModel.bindList("/SalesOrders");

			// oModel.callFunction("/SalesOrders", {
			// 	method: "POST",
			// 	urlParameters: {
			// 		SalesOrderType: "CP",
			// 		SalesOrganization: "1900"
			// 	},
			// 	success: function (oData, oResponse) {
			// 		sap.m.MessageToast.show("Record created successfully!");
			// 		// Handle success, e.g., refresh data
			// 	},
			// 	error: function (oError) {
			// 		sap.m.MessageToast.show("Error creating record: " + oError.message);
			// 		// Handle error
			// 	}
			// });



		},

		onReadProduct: function () {

			let oModel = this.getView().getModel("ProductCatModel");
			let oBindList = oModel.bindList("/ProductList");

			oBindList.requestContexts().then(function (aContexts) {
				aContexts.forEach(oContext => {
					console.log(oContext.getObject());
				});
			});



		},



		onCreateSalesOrder2: function () {

			var oSecondModel = this.getOwnerComponent().getModel("SalesOrderModel");

			var oListBinding = oSecondModel.bindList("/SalesOrders");

			var oContext = oListBinding.create({
				SalesOrderType: "OZ",
				SalesOrganization: "1989"
			});

			oContext.created().then(function () {
				// Now the context is created and persisted, safe to access its properties
				var sPath = oContext.getPath();
				const sHeaderKey = oContext.getProperty("ID"); // Replace with your actual key property
				// 2. Create/Update Navigation Items
				// Example for creating a new item
				let oItemBinding = oContext.getModel().bindList(sPath + "/to_Items"); // Replace with your navigation path
				oItemBinding.create(
					{
						"Material": "LXF071",
						"RequestedQuantity": 89
					}
				);
				// Further operations with the created context
			}).catch(function (oError) {
				// Handle error during creation
				console.error("Deep create failed:", oError);
			});



		},
		onCreateSalesOrder1: function () {

			var oSecondModel = this.getOwnerComponent().getModel("SalesOrderModel");

			var oListBinding = oSecondModel.bindList("/SalesOrders");


			var oNewData = {
				SalesOrderType: "OA",
				SalesOrganization: "1969",
				"to_Items": [
					{
						Material: "LXF099",
						RequestedQuantity: 19
					},
					{
						Material: "LXF099",
						RequestedQuantity: 99
					}
				]
			}


			var oContext = oListBinding.create({

				SalesOrderType: "OX",
				SalesOrganization: "1999"
				// ,
				// "to_Items": [
				// 	{
				// 		Material: "LXF099",
				// 		RequestedQuantity: 19
				// 	},
				// 	{
				// 		Material: "LXF099",
				// 		RequestedQuantity: 99
				// 	}
				// ]

			});

			oContext.created().then(function () {
				// Now the context is created and persisted, safe to access its properties
				var sPath = oContext.getPath();

				const sHeaderKey = oContext.getProperty("ID"); // Replace with your actual key property

				// 2. Create/Update Navigation Items
				// Example for creating a new item
				let oItemBinding = oContext.getModel().bindList("/SalesOrders('" + sHeaderKey + "')/to_Items"); // Replace with your navigation path

				oItemBinding.create(
					{
						"Material": "LXF071",
						"RequestedQuantity": 89
					}
				);
				// Further operations with the created context
			}).catch(function (oError) {
				// Handle error during creation
				console.error("Deep create failed:", oError);
			});







			//oListBinding.create(oNewData);


			// oSecondModel.create("/SalesOrders", oNewData, {
			// 	success: function (oData) {
			// 		// Handle successful deep create
			// 		console.log("Deep create successful:", oData);
			// 	},
			// 	error: function (oError) {
			// 		// Handle error during deep create
			// 		console.error("Deep create failed:", oError);
			// 	}
			// });



			var oContext = oListBinding.create({
				// Initial data for the SalesOrder header
				"SalesOrderType": "OF",
				"SalesOrganization": "1779"
			});

			// 1. Create the Header Entity
			// const oHeaderContext = oListBinding.create({
			// 	// Header properties
			// });

			oContext.created().then(function () {
				// Header creation successful, get the key
				const sHeaderKey = oContext.getProperty("ID"); // Replace with your actual key property

				// 2. Create/Update Navigation Items
				// Example for creating a new item
				let oItemBinding = oModel.bindList("/SalesOrders('" + sHeaderKey + "')/to_Items"); // Replace with your navigation path


				oItemBinding.create({
					"parent": sHeaderKey,
					"Material": "LXF091",
					"RequestedQuantity": 19
				});

				// Example for updating an existing item (if applicable)
				// const oExistingItemContext = oModel.getBindingContext("/ItemSet('someItemId')");
				// oExistingItemContext.setProperty("PropertyName", "NewValue");

				//oModel.submitBatch(); // Submit changes if using batching
			}).catch(function (oError) {
				// Handle error during header creation
			});













			// var oDeepPayload = {
			// 	SalesOrderId: "0", // Placeholder for server-generated ID
			// 	OrderType: "Standard",
			// 	Customer: "Customer A",
			// 	Items: [
			// 		{ Material: "MAT-001", Quantity: 10, Unit: "PC" },
			// 		{ Material: "MAT-002", Quantity: 5, Unit: "PC" }
			// 	]
			// };

			//oListBinding.create(oNewData);











			// 	let oData = {
			// 		// Initial data for the SalesOrder header
			// 		"SalesOrderType": "OF",
			// 		"SalesOrganization": "1789"
			// 	};

			// 	 oListBinding.create(oData)
			// .created()
			// .then(function (oContext) {

			// 	var oItemBinding = oContext.getBindingContext().getBinding("SalesOrderItems");

			// 	oItemBinding.create({
			// 		"Material": "LXF091",
			// 		"RequestedQuantity": 19
			// 	});
			// 	oItemBinding.create({
			// 		"Material": "LXF091",
			// 		"RequestedQuantity": 19
			// 	});

			//     // Now oContext is available and can be used
			//     // e.g., oContext.getBindingContext() or other operations
			// })
			// .catch(function (oError) {
			//     // Handle errors during creation
			// });



			// var oContext = oListBinding.create({
			// 	// Initial data for the SalesOrder header
			// 	"SalesOrderType": "OF",
			// 	"SalesOrganization": "1779"
			// });

			// var oItemBinding = oContext.getBindingContext().getBinding("SalesOrderItems");

			// oItemBinding.create({
			// 	"Material": "LXF091",
			// 	"RequestedQuantity": 19
			// });
			// oItemBinding.create({
			// 	"Material": "LXF091",
			// 	"RequestedQuantity": 19
			// });



			// oSecondModel.createEntry({
			// 	// Parent entity data
			// 	"SalesOrderType": "OF",
			//  	"SalesOrganization": "1779",
			// 	// Nested entity data for deep create
			// 	"to_Items": [
			// 		{
			// 			"Material": "LXF091",
			// 			"RequestedQuantity": 19
			// 		},
			// 		{
			// 			"Material": "LXF092",
			// 			"RequestedQuantity": 99
			// 		}
			// 	]
			// });

			//oSecondModel.submitBatch();

			let test = "test";





			//	var oContext = oListBinding.create(oNewData, true);


			// var oContext = oListBinding.create({
			// 	// Initial data for the SalesOrder header
			// 	"SalesOrderType": "QF",
			// 	"SalesOrganization": "1709"
			// }, true);


			//	var oItemBinding = oSecondModel.bindList("/SalesOrderItems");

			// const oItemBinding = oContext.getBinding("/to_Items");



			// oItemBinding.create({
			// 	"Material": "LXF009",
			// 	"RequestedQuantity": 10
			// });
			// oItemBinding.create({
			// 	"Material": "LXF009",
			// 	"RequestedQuantity": 20
			// });




		},

		onCreateSalesOrder: function () {

			const oSimpleForm = this.getView().byId("mySimpleForm");
			var oModel = this.getView().getModel(); // Get the OData V4 model
			var oListBinding = oModel.bindList("/Products"); // Bind to the collection where you want to create

			var oNewData = {
				ProductName: "New Product-1",
				Price: 11.00,
				Currency: "USD"
			};

			// Create the new entity
			var oNewContext = oListBinding.create(oNewData);

			oSimpleForm.setBindingContext(oNewData);









			//            const oSimpleForm = this.getView().byId("mySimpleForm");

			// 		   var oListBinding = ODataModel.bindList("/Products");
			// 		   var oNewProductContext = oListBinding.create({
			//     ProductName: "New Product",
			//     Price: 10.00,
			//     Currency: "USD"
			// });

			//   oSimpleForm.setBindingContext(oNewProductContext);

			//   ODataModel.submitBatch("$auto");










			//  var oSalesOrderData = this.oModel.getProperty("/User"); // Get data from bound model


			//const oNewEntryContext = this.oModel.createEntry("/User");



			// var oNewEntry = this.oModel.createEntry("/User", {
			//     properties: oSalesOrderData,
			//     success: function () {
			//         MessageToast.show("Sales Order created successfully!");
			//     },
			//     error: function (oError) {
			//         MessageToast.show("Error creating Sales Order: " + oError.message);
			//     }
			// });
			//  this.oModel.submitChanges();

			// const oModel = this.getOwnerComponent().getModel();
			// const oForm = this.getView().byId("mySimpleForm");
			// const oContext = oForm.getBindingContext();


			//   oModel.metadataLoaded().then(() => {
			//     const oContext = oModel.createEntry("/User"); // Replace YourEntitySet
			//     this.getView().byId("mySimpleForm").setBindingContext(oContext);
			// });


			// Submit the changes to the backend
			// oModel.submitBatch(oContext.getGroupId()).then(() => {
			//     MessageToast.show("Entity created successfully!");
			//     // Optionally navigate or clear the form
			// }).catch((oError) => {
			//     MessageToast.show("Error creating entity: " + oError.message);
			// });


			// 	oContext.created()
			// .then(() => {
			//     //Once the creation is done
			//    // this.getView().bindObject(oContext.getPath());
			// });


			//           oModel.submitChanges({
			//     success: function () {
			//         sap.m.MessageToast.show("Product created successfully!");
			//     },
			//     error: function (oError) {
			//         sap.m.MessageToast.show("Error creating product: " + oError.message);
			//     }
			// })


			// Submit the changes to the backend
			// oModel.submitBatch(oContext).then(() => {
			//     MessageToast.show("Entity created successfully!");
			//     // Optionally navigate or clear the form
			// }).catch((oError) => {
			//     MessageToast.show("Error creating entity: " + oError.message);
			// })










		},


		onSubmitRating: function (oEvent) {
			var fRating = oEvent.getParameter("value");
			MessageToast.show("You rated: " + fRating);
		},

		/* =========================================================== */
		/*           begin: event handlers                             */
		/* =========================================================== */

		/**
		 * Create a new entry.
		 */
		onCreate: function () {
			var oList = this.byId("peopleList"),
				oBinding = oList.getBinding("items"),
				// Create a new entry through the table's list binding
				oContext = oBinding.create({ Age: 18 });

			this._setUIChanges(true);
			this.getView().getModel("appView").setProperty("/usernameEmpty", true);

			// Select and focus the table row that contains the newly created entry
			oList.getItems().some(function (oItem) {
				if (oItem.getBindingContext() === oContext) {
					oItem.focus();
					oItem.setSelected(true);
					return true;
				}
			});
		},

		/**
		 * Lock UI when changing data in the input controls
		 * @param {sap.ui.base.Event} oEvt - Event data
		 */
		onInputChange: function (oEvt) {
			if (oEvt.getParameter("escPressed")) {
				this._setUIChanges();
			} else {
				this._setUIChanges(true);
				// Check if the username in the changed table row is empty and set the appView
				// property accordingly
				if (oEvt.getSource().getParent().getBindingContext().getProperty("UserName")) {
					this.getView().getModel("appView").setProperty("/usernameEmpty", false);
				}
			}
		},

		/**
		 * Refresh the data.
		 */
		onRefresh: function () {
			var oBinding = this.byId("peopleList").getBinding("items");

			if (oBinding.hasPendingChanges()) {
				MessageBox.error(this._getText("refreshNotPossibleMessage"));
				return;
			}
			oBinding.refresh();
			MessageToast.show(this._getText("refreshSuccessMessage"));
		},

		/**
		 * Reset any unsaved changes.
		 */
		onResetChanges: function () {
			this.byId("peopleList").getBinding("items").resetChanges();
			// If there were technical errors, cancelling changes resets them.
			this._bTechnicalErrors = false;
			this._setUIChanges(false);
		},

		/**
		 * Save changes to the source.
		 */
		onSave: function () {
			var fnSuccess = function () {
				this._setBusy(false);
				MessageToast.show(this._getText("changesSentMessage"));
				this._setUIChanges(false);
			}.bind(this),

				fnError = function (oError) {
					this._setBusy(false);
					this._setUIChanges(false);
					MessageBox.error(oError.message);
				}.bind(this);

			this._setBusy(true); // Lock UI until submitBatch is resolved.
			this.getView().getModel().submitBatch("peopleGroup").then(fnSuccess, fnError);
			// If there were technical errors, a new save resets them.
			this._bTechnicalErrors = false;
		},

		/**
		 * Search for the term in the search field.
		 */
		onSearch: function () {
			var oView = this.getView(),
				sValue = oView.byId("searchField").getValue(),
				oFilter = new Filter("LastName", FilterOperator.Contains, sValue);

			oView.byId("peopleList").getBinding("items").filter(oFilter, FilterType.Application);
		},

		/**
		 * Sort the table according to the last name.
		 * Cycles between the three sorting states "none", "ascending" and "descending"
		 */
		onSort: function () {
			var oView = this.getView(),
				aStates = [undefined, "asc", "desc"],
				aStateTextIds = ["sortNone", "sortAscending", "sortDescending"],
				sMessage,
				iOrder = oView.getModel("appView").getProperty("/order"),
				sOrder;

			// Cycle between the states
			iOrder = (iOrder + 1) % aStates.length;
			sOrder = aStates[iOrder];

			oView.getModel("appView").setProperty("/order", iOrder);
			oView.byId("peopleList").getBinding("items")
				.sort(sOrder && new Sorter("LastName", sOrder === "desc"));

			sMessage = this._getText("sortMessage", [this._getText(aStateTextIds[iOrder])]);
			MessageToast.show(sMessage);
		},

		onMessageBindingChange: function (oEvent) {
			var aContexts = oEvent.getSource().getContexts(),
				aMessages,
				bMessageOpen = false;

			if (bMessageOpen || !aContexts.length) {
				return;
			}

			// Extract and remove the technical messages
			aMessages = aContexts.map(function (oContext) {
				return oContext.getObject();
			});
			Messaging.removeMessages(aMessages);

			this._setUIChanges(true);
			this._bTechnicalErrors = true;
			MessageBox.error(aMessages[0].message, {
				id: "serviceErrorMessageBox",
				onClose: function () {
					bMessageOpen = false;
				}
			});

			bMessageOpen = true;
		},

		/* =========================================================== */
		/*           end: event handlers                               */
		/* =========================================================== */

		/**
		 * Convenience method for retrieving a translatable text.
		 * @param {string} sTextId - the ID of the text to be retrieved.
		 * @param {Array} [aArgs] - optional array of texts for placeholders.
		 * @returns {string} the text belonging to the given ID.
		 */
		_getText: function (sTextId, aArgs) {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle()
				.getText(sTextId, aArgs);
		},

		/**
		 * Set hasUIChanges flag in View Model
		 * @param {boolean} [bHasUIChanges] - set or clear hasUIChanges
		 * if bHasUIChanges is not set, the hasPendingChanges-function of the OdataV4 model
		 * determines the result
		 */
		_setUIChanges: function (bHasUIChanges) {
			if (this._bTechnicalErrors) {
				// If there is currently a technical error, then force 'true'.
				bHasUIChanges = true;
			} else if (bHasUIChanges === undefined) {
				bHasUIChanges = this.getView().getModel().hasPendingChanges();
			}
			var oModel = this.getView().getModel("appView");

			oModel.setProperty("/hasUIChanges", bHasUIChanges);
		},

		/**
		 * Set busy flag in View Model
		 * @param {boolean} bIsBusy - set or clear busy
		 */
		_setBusy: function (bIsBusy) {
			var oModel = this.getView().getModel("appView");

			oModel.setProperty("/busy", bIsBusy);
		},

		//start of upload methids

		onUploadPress: function () {
			const oFileUploader = this.byId("fileUploader");
			oFileUploader.upload(); // Triggers the upload
		},

		onUploadComplete: function (oEvent) {
			const sResponse = oEvent.getParameter("response");
			// Handle the response from the CAPM action
			console.log("Upload complete. Response:", sResponse);
			sap.m.MessageToast.show("File upload status: " + sResponse);
			// You might need to refresh the Fiori app data if the upload affects it
		}

		//end of upload methods





		//end of methods
	});
});