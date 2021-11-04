// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/InvoicesFormatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, JSONModel, InvoicesFormatter, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("alight.sapui5.controller.InvoiceesList", {

            formatter: InvoicesFormatter,

            onInit: function () {
                var oViewModel = new JSONModel({
                    usd: "USD",
                    eur: "EUR"
                });

                this.getView().setModel(oViewModel, "currency");
            },

            onFilterInvoices: function (oEvent) {
                const aFilter = [];
                const sQuery = oEvent.getParameter("query");
                const oList = this.getView().byId("invoiceList");
                const oBinding = oList.getBinding("items");

                if (sQuery) {
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                }
                oBinding.filter(aFilter);



            },

            navigateToDetails: function (oEvent) {

                const oRouter = sap.ui.core.UIComponent.getRouterFor(this),
                    oItem = oEvent.getSource();

                oRouter.navTo("Details", {
                    invoicePath: window.encodeURIComponent(oItem.getBindingContext("northwind").getPath().substr(1))
                });
            }
        });
    }); 