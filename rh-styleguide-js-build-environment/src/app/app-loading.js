// Header with menu
var appHeaderScript = document.createElement("script");
appHeaderScript.src = "app/components/header.js";
appHeaderScript.onload = function () {
    console.log("Menu is loaded");
};

var appBundleLoadingScript = document.createElement("script");
appBundleLoadingScript.src = "app/bundle-loading.js";
appBundleLoadingScript.onload = function () {
    console.log("JS bundle file is loading...");
};

document.body.appendChild(appHeaderScript);
document.body.appendChild(appBundleLoadingScript);
