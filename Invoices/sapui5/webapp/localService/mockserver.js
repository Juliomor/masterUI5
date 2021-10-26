// @ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],
    /**
     * 
     * @param{ typeof sap.ui.core.MockSever} MockSever
     * @param{ typeof sap.ui.model.json.JSONModel} JSONModel
     * @param{ typeof sap.base.util.UriParameters} UriParameters
     * @param{ typeof sap.base.Log} Log
     */
    function (MockSever, JSONModel, UriParameters, Log) {
        "use strict";

        var oMockServer,
            _sAppPath = "alight/sapui5/",
            _sJsonFilesPath = _sAppPath + "localService/mockdata";

        var oMockSeverInterface = {
            /**
            * Init the mock server async.
            * @protected
            * @param {object} oOptionsParameter
            * @returns {Promise} a promise that is resolved when mock saver is started
            */
            init: function (oOptionsParameter) {

                var oOptions = oOptionsParameter || {};

                return new Promise(function (fnResolve, fnReject) {
                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParameters = new UriParameters(window.location.href);

                        //Parse manifest for local metadata URI
                        var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath),
                            oMainDataSources = oManifestModel.getProperty("/sap.app/dataSources/mainService"),
                            sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSources.settings.localUri);

                        //Ensure there is a trailling slash
                        var sMockServerUrl = oMainDataSources.uri && new URI(oMainDataSources.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                        //Create mock server instance or stop existing one to reinit
                        if (!oMockServer) {
                            oMockServer = new MockSever({
                                rootUri: sMockServerUrl
                            });
                        } else {
                            oMockServer.stop();
                        }

                        //Configure mock server with given optioons or default deay of 0,5 secs
                        MockSever.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500)
                        });

                        //Sim all request with mock data
                        oMockServer.simulate(sMetadataUrl, {
                            sMockdataBaseUrl: sJsonFilesUrl,
                            bGenerateMissingMockData: true
                        });

                        var aRequest = oMockServer.getRequests();

                        //Create error response for each request
                        var fnResponse = function (iErrCode, sMessage, aRequest) {
                            aRequest.response = function (oXhr) {
                                oXhr.respond(iErrCode, { "Content-Type": "text/plain;charset=utf-8" }, sMessage);
                            };
                        };

                        //simulate metadata errors
                        if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                            aRequest.forEach(function (aEntry) {
                                if (aEntry.path.toString().indexof("$metadata") > -1) {
                                    fnResponse(500, "metadata Error", aEntry);
                                }
                            });
                        }

                        //simulate request errors
                        var sErrorParam = oOptions.errorType || oUriParameters.get("errorType"),
                            iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                        if (sErrorParam) {
                            aRequest.forEach(function (aEntry) {
                                fnResponse(iErrorCode, sErrorParam, aEntry);
                            });
                        }

                        //set request and start the server
                        oMockServer.setRequests(aRequest);
                        oMockServer.start();
                        Log.info("Running the app with mock data");
                        fnResolve();
                    });

                    oManifestModel.attachRequestFailed(function () {
                        var sError = "Failed to load the application manifest";
                        Log.error(sError);
                        fnReject(new Error(sError));
                    });
                });
            }
        };

        return oMockSeverInterface;

    });