// Helpers
function fetchData(url, fnReturnData) {
    try {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var configData = JSON.parse(this.responseText);
                fnReturnData(configData);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    } catch (e) {
        console.error(e);
    }
}

function getCurrentPageName() {
    try {
        var pathName = window.location.pathname;
        var pageName = pathName.split("/")[1] || '';

        return pageName;
    } catch (e) {
        return e;
    }
}

function createLinkStyleSheetTag(cssFilePath, fnResult) {
    try {
        var cssLinkTag = document.createElement("link");
        cssLinkTag.rel = "stylesheet";
        cssLinkTag.type = "text/css";
        cssLinkTag.href = cssFilePath;
        cssLinkTag.onload = function () {
            fnResult(cssFilePath);
        };

        document.head.appendChild(cssLinkTag);
        
    } catch (e) {
        console.error(e);
    }
}

function createScriptTag(jsFilePath, fnResult) {
    try {
        var jsScriptTag = document.createElement("script");
        jsScriptTag.src = jsFilePath;
        jsScriptTag.onload = function () {
            fnResult(jsFilePath);
        };

        document.body.appendChild(jsScriptTag);
    } catch (error) {
        console.error(error);
    }
}

var globalAppConfigUrl = "/app.config.json";