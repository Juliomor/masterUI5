// @ts-nocheck
/* Global Qunit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require([
        "alight/sapui5/test/unit/AllTest"
    ], function () {
        QUnit.start();
    });
});
