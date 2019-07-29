// Header with menu
var appHeaderScript = document.createElement("script");
appHeaderScript.src = "app/components/header.js";

var appBundleLoadingScript = document.createElement("script");
appBundleLoadingScript.src = "app/bundle-loading.js";

document.body.appendChild(appHeaderScript);
document.body.appendChild(appBundleLoadingScript);
