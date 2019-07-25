// Include production resources
$(document).ready(function () {
    $.getJSON('/app.config.json')
        .done(function (data) {
            var { environment } = data;

            if (environment && environment === "production") {
                var { bundle } = data;

                if (bundle) {
                    var { bundleName, jsPublicPath, cssPublicPath } = bundle;

                    if (bundleName, jsPublicPath, cssPublicPath) {
                        var cssFullFilePath = cssPublicPath + "/" + bundleName + ".css",
                            jsFullFilePath = jsPublicPath + "/" + bundleName + ".min.js";

                        var bundleCSS = "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + cssFullFilePath + "\">";

                        $('head').append(bundleCSS);
                        $.getScript(jsFullFilePath);
                    }
                }
            }
        })
        .fail(function (error) {
            console.log("Can't retrieve the config data", error);
        })
        .always(function () {
            // Default loading
            var appTitle = "The Styleguide build environment";
            $('title').append(appTitle);
        });
});