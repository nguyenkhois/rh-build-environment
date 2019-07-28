// Helpers
function fetchData(url, fnReturnData) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var configData = JSON.parse(this.responseText);
            fnReturnData(configData);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}