    // myapp/controls/MyRatingControl.js
    sap.ui.define([
        "sap/ui/core/Control",
        "sap/m/RatingIndicator",
        "sap/m/Button"
    ], function (Control, RatingIndicator, Button) {
        "use strict";

        return Control.extend("ns.userdata.utils.MyRatingControl", {
            metadata: {
                properties: {
                    value: { type: "float", defaultValue: 0 },
                    maxValue: { type: "int", defaultValue: 5 },
                    text: { type: "string", defaultValue: "Submit Rating" }
                },
                events: {
                    submit: {
                        parameters: {
                            value: { type: "float" }
                        }
                    }
                },
                aggregations: {
                    _ratingIndicator: { type: "sap.m.RatingIndicator", multiple: false, visibility: "hidden" },
                    _submitButton: { type: "sap.m.Button", multiple: false, visibility: "hidden" }
                }
            },

            init: function () {
                this.setAggregation("_ratingIndicator", new RatingIndicator({
                    maxValue: this.getMaxValue(),
                    value: this.getValue(),
                    liveChange: this._onRatingChange.bind(this)
                }));

                this.setAggregation("_submitButton", new Button({
                    text: this.getText(),
                    press: this._onSubmitPress.bind(this)
                }));
            },

            _onRatingChange: function (oEvent) {
                this.setProperty("value", oEvent.getParameter("value"), true); // true for suppressInvalidate
            },

            _onSubmitPress: function () {
                this.fireEvent("submit", { value: this.getValue() });
            },

            renderer: function (oRm, oControl) {
                oRm.write("<div");
                oRm.writeControlData(oControl);
                oRm.writeClasses();
                oRm.write(">");

                oRm.renderControl(oControl.getAggregation("_ratingIndicator"));
                oRm.renderControl(oControl.getAggregation("_submitButton"));

                oRm.write("</div>");
            }
        });
    });