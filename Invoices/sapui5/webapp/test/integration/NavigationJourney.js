// @ts-nocheck
sap.ui.define([
    "alight/sapui5/localService/mockserver",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel"
],
    /**
     * @param {typeof sap.ui.test.opaQunit} opaQunit
     */
    function (mockserver, opaQunit) {
        "use strict";

        QUnit.module("Navigation");
        opaQunit("Should open the Hello Dialog", function (Given, When, Then) {

            //Init mock server
            mockserver.init();

            //Arragement
            Given.iStartMyUIComponent({
                componentConfig: {
                    name: "alight.sapui5"
                }
            });

            //Actions
            When.onTheAppPage.iSayHelloDialogButton();

            //Assertions
            Then.onTheAppPage.iSeeTheHelloDialog();

            //Clean up
            Then.iTeardownMyApp();
        });

    });