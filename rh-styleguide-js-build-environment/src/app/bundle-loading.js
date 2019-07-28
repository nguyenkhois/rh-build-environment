var url = '../../app.config.json';
fetchData(url, function (data) {
    if (data.environment === "production") {
        if (data.bundle) {
            var bundleInfo = data.bundle;

            if (bundleInfo.bundleName && bundleInfo.jsPublicPath) {
                var jsPublicPath = bundleInfo.jsPublicPath,
                    bundleName = bundleInfo.bundleName;

                var jsFullPathName = jsPublicPath + "/" + bundleName + ".js";
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
