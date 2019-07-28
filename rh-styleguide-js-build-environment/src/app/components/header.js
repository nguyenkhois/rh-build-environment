var appHeaderSectionTag = document.createElement("section");
appHeaderSectionTag.innerHTML =
"<section class='app__header'>" +
    "<div><h1>Styleguide build environment</h1></div>" +
    "<nav class='app__header__menu'>" +
        "<ul>"+
            "<li><a href='/'>Home</a></li>" +
            "<li><a href='/menu'>Menu component</a></li>" +
        "</ul>"+
    "</nav>" +
"</section>";

var bodyFirstChild = document.body.firstChild;
if (bodyFirstChild) {
    document.body.insertBefore(appHeaderSectionTag, bodyFirstChild);
} else {
    document.body.append(appHeaderSectionTag);
}
