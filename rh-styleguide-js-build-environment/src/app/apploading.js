var appHeaderUrl = "app/components/header.js";
var appBundleLoadingUrl = "app/bundleloading.js";

$.when(
    $.getScript(appHeaderUrl),
    $.getScript(appBundleLoadingUrl),
    $.Deferred(function (deferred) {
        $(deferred.resolve);
    })
).then(function () {
    console.log('Application is loaded successfully');
}).catch(function (error) {
    console.error("Can not load the application", error);
});