var appHeaderSectionTag = document.createElement("section");
appHeaderSectionTag.innerHTML =
    "<section class='app__header'>" +
    "<div><h1>Styleguide build environment</h1></div>" +
    "<div>" +
        "<a href='/' rel='noopener noreferrer'><img src='images/icon-home.png' class='app__header-icon'></a>" +
        "<a href='https://github.com/nguyenkhois/rh-styleguide-js-build-environment' target='_blank' rel='noopener noreferrer'><img src='images/github-logo.png'></a>" +
    "</div>" +
    "<nav class='app__header__menu'>" +
    "<ul>" +
    "<li><a href='/back-to-top'>Back to top</a></li>" +
    "<li><a href='/slide-menu'>Slide menu</a></li>" +
    "</ul>" +
    "</nav>" +
    "</section>";

var bodyFirstChild = document.body.firstChild;
if (bodyFirstChild) {
    document.body.insertBefore(appHeaderSectionTag, bodyFirstChild);
} else {
    document.body.append(appHeaderSectionTag);
}
