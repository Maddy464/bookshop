sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        submitOrder: function(oEvent) {

            let sActionName = "CatalogService.submitOrder";
			let mParameters = {
				contexts: oEvent.getSource().getBindingContext(),
				model: oEvent.getSource().getModel(),
				label: 'Confirm',	
				invocationGrouping: true 	
			};
			this.editFlow.invokeAction(sActionName, mParameters); //SAP Fiori elements EditFlow API
            MessageToast.show("Custom handler invoked.");
        }
    };
});
