var appTitle = "The Styleguide build environment";
document.title = appTitle;

var url = '../../app.config.json';
fetchData(url, function (data) {
    if (data.environment === "production") {
        if (data.bundle) {
            var bundleInfo = data.bundle;

            if (bundleInfo.bundleName && bundleInfo.cssPublicPath) {
                var cssPublicPath = bundleInfo.cssPublicPath,
                    bundleName = bundleInfo.bundleName;

                var cssFullPathName = cssPublicPath + "/" + bundleName + ".css";
                var linkStyleSheetTag = document.createElement("link");
                linkStyleSheetTag.rel = "stylesheet";
                linkStyleSheetTag.type = "text/css";
                linkStyleSheetTag.href = cssFullPathName;
                document.head.appendChild(linkStyleSheetTag);

                console.log(cssFullPathName, "is loaded");
            }
        }
    }
});