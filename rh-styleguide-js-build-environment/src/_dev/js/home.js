$(document).ready(function () {
    if ($('#home-container')) {
        var homeMessage = "<p>Home component</p>";
        $('#home-container').prepend(homeMessage);
    }
});