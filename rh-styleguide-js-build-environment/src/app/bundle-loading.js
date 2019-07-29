var url = '../../app.config.json';
fetchData(url, function (data) {
    var bundleEnvMode = data.environment;

    if (bundleEnvMode && bundleEnvMode !== "development") {
        var bundleInfo = data.bundle;

        if (bundleInfo) {
            if (bundleInfo.bundleName && bundleInfo.jsPublicPath) {
                var jsPublicPath = bundleInfo.jsPublicPath,
                    bundleName = bundleInfo.bundleName;

                var jsFullPathName = jsPublicPath + "/" + bundleName;

                switch (bundleEnvMode) {
                    case 'build':
                        jsFullPathName += ".js";
                        break;

                    default:
                        jsFullPathName += ".min.js";
                        break;
                }

                var scriptBundleTag = document.createElement("script");
                scriptBundleTag.src = jsFullPathName;
                scriptBundleTag.onload = function () {
                    console.log(jsFullPathName, "is loaded");
                };

                document.body.appendChild(scriptBundleTag);
            }
        }
    }
});
