// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.m.MessageToast} MessageToast 
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("alight.sapui5.controller.HelloPanel", {

            onInit: function () {
            },

            onShowHello: function () {
                var oBundel = this.getView().getModel("i18n").getResourceBundle(),
                    sRecipient = this.getView().getModel().getProperty("/recipient/name"),
                    sMsg = oBundel.getText("helloMsg", [sRecipient]);

                MessageToast.show(sMsg);
            },

            onOpenDialog: function () {
                this.getOwnerComponent().openHelloDialog();
            },


        });
    });