// @ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "alight/sapui5/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog",
    "sap/ui/Device"
],
    /**
     * 
     * @param {typeof sap.ui.core.UIComponent} UIComponent 
     * @param {typeof alight.sapui5.model.Models} Models
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     * @param {typeof sap.ui.Device} Device
     */
    function (UIComponent, Models, ResourceModel, HelloDialog, Device) {

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

                //Set device model
                this.setModel(Models.createDeviceModel(), "device");

                //Init Routing
                this.getRouter().initialize();
            },

            exit: function () {
                this._helloDialog.destroy();
                delete this._helloDialog;
            },

            openHelloDialog: function () {
                this._helloDialog.open();
            },

            getContentDensityClass: function () {
                if (!Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
                return this._sContentDensityClass;
            }
        });
    });