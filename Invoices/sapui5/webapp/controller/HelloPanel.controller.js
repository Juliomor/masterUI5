// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/base/Log"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.m.MessageToast} MessageToast 
     * @param {type of sap.base.Log} Log
     */
    function (Controller, MessageToast, Log) {
        "use strict";

        return Controller.extend("alight.sapui5.controller.HelloPanel", {

            onInit: function () {
            },

            onBeforeRendering: function () {
                /*window.message = "Log Message - onBeforeRendering";
                Log.info(window.message);
                Log.error(window.message);*/
            },

            onAfterRendering: function () {
                //debugger;
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