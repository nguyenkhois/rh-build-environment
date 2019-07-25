$(document).ready(function () {
    var $appHeader = $("<section></section>", { "class": "app__header" });
    $appHeader.append("<div><h1>Styleguide build environment</h1></div>");

    var $appHeaderNav = $("<nav></nav>", { "class": "app__header__menu" });

    var appHeaderMenu =
        "<ul>" +
        "<li><a href=\"/\">Home</a></li>" +
        "<li><a href=\"/menu\" title=\"Menu component\">Menu</a></li>" +
        "</ul>";

    $appHeaderNav.append(appHeaderMenu);
    $appHeader.append($appHeaderNav);

    // Render Header component
    $('body').prepend($appHeader);
});