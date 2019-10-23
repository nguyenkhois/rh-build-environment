fetchData(globalAppConfigUrl, function (data) {
    var headTagEnvMode = data.environment;

    switch (headTagEnvMode) {
        case "development":
            var cssAppFilePath = data.development.cssDevLocation + "app.css";
            createLinkStyleSheetTag(cssAppFilePath, function(result) {
                console.log(result, "is included");
            });


            var currentPageName = getCurrentPageName();
            var cssDevFilePath = data.development.cssDevLocation;

            if (cssDevFilePath) {
                if (!currentPageName) {
                    cssDevFilePath += "home.css";
                } else {
                    cssDevFilePath += currentPageName + ".css";
                }

                createLinkStyleSheetTag(cssDevFilePath, function(result) {
                    console.log(result, "is included");
                });
            }

            break;

        // Build or Production mode
        case "build":
        case "production":
            if (data.bundle) {
                var bundleInfo = data.bundle;

                if (bundleInfo.bundleName && bundleInfo.cssPublicPath) {
                    var cssPublicPath = bundleInfo.cssPublicPath,
                        bundleName = bundleInfo.bundleName;

                    var cssBundleFilePath = cssPublicPath + "/" + bundleName + ".css";
                    createLinkStyleSheetTag(cssBundleFilePath, function(result) {
                        console.log(result, "is included");
                    });
                }
            }
            break;

        default:
            break;
    }
});

