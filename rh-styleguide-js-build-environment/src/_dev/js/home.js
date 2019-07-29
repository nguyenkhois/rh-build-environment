$(document).ready(function () {
    var homeMessage = "<p>Home component</p>";
    $('#home-container').prepend(homeMessage);

    // Test jQuery + ES6 --compiled--> ES5 (IE11 is important)
    let arrTemp = ["test", "new"];
    arrTemp = arrTemp.map((item) => `src/${item}`);
    console.log(arrTemp);
});