function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

$(document).ready(function () {
    var scrollbarWidth = calculateScrollbarWidth(),
        isIDevice = isMobileDevice(),
        isSmallScreen = $(document).width() < 768;

    var $body = $('body'),
        $menuMainButton = $('#rh-menu-main-button'),
        $menuCloseButton = $('#rh-menu-close-button'),
        $menuBody = $('#rh-menu-body');

    var $menuOverlay = $('.rh-menu__overlay'),
        $menuTopBar = $('.rh-menu__top-bar'),
        $menuBodyOffsetTop = $('.rh-menu__offset-top');

    var $menuItemButton = $('.rh-menu__item-button'),
        $menuSubContainers = $('.rh-menu__item-sub-container');

    var $menuMainButtonDefaultPaddingRight = isSmallScreen ? "0.84375em" : "0.7em", // View more in CSS
        $menuBodySpaceTop = 30;

    // Initial state
    $menuSubContainers.addClass('rh-dp--none');
    $menuBody.addClass('rh-pos--fixed rh-dp--none').css({ "top": $(window).scrollTop() });
    $menuTopBar.css({ "max-width": $menuBody.width() });

    $(window).resize(throttle(function () {
        // Update max-width for menu when windows resizing
        scrollbarWidth = calculateScrollbarWidth();
        $menuMainButtonDefaultPaddingRight = isSmallScreen ? "0.84375em" : "0.7em";
        $menuTopBar.css({ "max-width": $menuBody.width() });
    }, 80));

    $(document).scroll(throttle(function () {
        // Update menu position when scrolling
        $menuBody.css({ "top": $(window).scrollTop() });
    }, 200));

    $menuMainButton.click(function (e) {
        e.stopPropagation();

        lockBodyScrolling(true);

        $menuOverlay.toggleClass('rh-dp--none rh-dp--show');

        $menuTopBar
            .addClass('rh-pos--fixed')
            .css({
                "width": "100%",
                "max-width": $menuBody.width(),
                "padding-right": parseInt($menuTopBar.css('padding-right')) + scrollbarWidth
            });

        $menuBody
            .removeClass('rh-dp--none')
            .addClass('rh-dp--show')
            .removeClass('rh-pos--fixed')
            .addClass('rh-pos--absolute')// Using the position "absolute" for iOS performance
            .css({ "top": $(window).scrollTop() })
            .addClass('rh-menu__body--show');

        $menuBodyOffsetTop.css({ "height": parseInt($menuTopBar.height() + $menuBodySpaceTop) });
    });

    $menuCloseButton.click(function (e) {
        e.stopPropagation();

        closeMenu();
    });

    $menuItemButton.click(function (e) {
        e.stopPropagation();

        var $menuItemButton = $(this),
            $menuItemSubContainer = $("#sub" + $menuItemButton.attr('id')),  // Menu item's sub container ID
            $menuItemIsLevel1 = false,
            $menuItemLink = $(this).closest("div[class^='rh-menu__item']").find("a");

        if ($menuItemButton.hasClass("rh-menu__item-button-parent")) {
            $menuItemIsLevel1 = true;
        }

        $menuItemButton.find("span").toggleClass("icon-plus icon-minus");

        if (!$menuItemIsLevel1) {
            $menuItemButton.toggleClass("rh-menu__item-button-sub-item rh-menu__item-button-sub-item--active");
            $menuItemLink.toggleClass("rh-menu__link--active");
        }

        $menuItemSubContainer.length && $menuItemSubContainer.toggleClass("rh-dp--none rh-dp--show");
    });

    // When the user clicks outside of the menu
    $(document).on('mouseup touchstart', function (e) {
        e.stopPropagation();
        
        if ($(e.target).closest($menuBody).length === 0 && $menuOverlay.hasClass('rh-dp--show')) {
            closeMenu();
        }
    });

    function closeMenu() {
        $menuTopBar
            .removeClass('rh-pos--fixed')
            .css({
                "width": "",
                "max-width": "",
                "padding-right": $menuMainButtonDefaultPaddingRight
            });

        $('#rh-menu-body').removeClass('rh-menu__body--show');
        hideMenuBody();

        $menuBodyOffsetTop.css({ "height": $menuBodySpaceTop });
        $menuOverlay.toggleClass('rh-dp--none rh-dp--show');
    }

    var menuBodyHiddenTimer;
    var menuScrollbarShowingTimer;
    function hideMenuBody() {
        menuScrollbarShowingTimer && clearTimeout(menuScrollbarShowingTimer);
        menuScrollbarShowingTimer = setTimeout(function () {
            lockBodyScrolling(false);
        }, 160);

        menuBodyHiddenTimer && clearTimeout(menuBodyHiddenTimer);
        menuBodyHiddenTimer = setTimeout(function () {
            $('#rh-menu-body')
                .removeClass('rh-pos--absolute rh-dp--show')
                .addClass('rh-pos--fixed rh-dp--none');
        }, 600);
    }

    /* Common */
    function lockBodyScrolling(status, fnCallback) {
        //github.com/willmcpo/body-scroll-lock
        var disableBodyScroll = bodyScrollLock.disableBodyScroll,
            enableBodyScroll = bodyScrollLock.enableBodyScroll;

        var targetElement = document.querySelector(".rh-menu__body");

        if (status) {
            $body.addClass("rh-noscroll").css({ "margin-right": scrollbarWidth });
            isIDevice && disableBodyScroll(targetElement);
        } else {
            $body.removeClass("rh-noscroll").css({ "margin-right": "" });
            isIDevice && enableBodyScroll(targetElement);
        }

        typeof fnCallback === 'function' && fnCallback();
    }

    /* Helpers */
    function calculateScrollbarWidth() {
        return (window.innerWidth - document.body.clientWidth);
    }

    function isMobileDevice() {
        return !!navigator.platform && /iPad|iPhone|iPod/g.test(navigator.platform);
    }
});