fetchData(globalAppConfigUrl, function (data) {
    var appEnvMode = data.environment || 'development';

    switch (appEnvMode) {
        case 'development':
            var currentPageName = getCurrentPageName();
            var devJsFilePath = data.development.jsDevLocation;

            if (devJsFilePath) {
                if (!currentPageName) {
                    devJsFilePath += "home.js";
                } else {
                    devJsFilePath += currentPageName + ".js";
                }

                createScriptTag(devJsFilePath, function(result) {
                    console.log(result, "is included");
                });
            }

            break;

        // Only using for "build" and "production"
        case "build":
        case "production":
            var bundleInfo = data.bundle;

            if (bundleInfo) {
                if (bundleInfo.bundleName && bundleInfo.jsPublicPath) {
                    var jsPublicPath = bundleInfo.jsPublicPath,
                        bundleName = bundleInfo.bundleName;

                    var jsFullPathName = jsPublicPath + "/" + bundleName;

                    switch (appEnvMode) {
                        case 'build':
                            jsFullPathName += ".js";
                            break;

                        default:
                            jsFullPathName += ".min.js";
                            break;
                    }

                    createScriptTag(jsFullPathName, function(result) {
                        console.log(result, "is included");
                    });
                }
            }

            break;

        default:
            break;
    }
});
