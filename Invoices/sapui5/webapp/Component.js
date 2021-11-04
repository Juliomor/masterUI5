// @ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "alight/sapui5/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog"
],
    /**
     * 
     * @param {typeof sap.ui.core.UIComponent} UIComponent 
     * @param {typeof alight.sapui5.model.Models} Models
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     */
    function (UIComponent, Models, ResourceModel, HelloDialog) {

        return UIComponent.extend("alight.sapui5.Component", {

            metadata: {
                manifest: "json"
            },

            init: function () {
                //Parent init function
                UIComponent.prototype.init.apply(this, arguments);

                //Data model                           
                this.setModel(Models.createRecipient());

                this._helloDialog = new HelloDialog(this.getRootControl());

                //Init Routing
                this.getRouter().initialize();
            },

            exit: function () {
                this._helloDialog.destroy();
                delete this._helloDialog;
            },

            openHelloDialog: function () {
                this._helloDialog.open();
            }
        });
    });