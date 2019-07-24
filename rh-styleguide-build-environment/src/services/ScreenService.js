function getViewportSize() {
    const width = Math.max(document.documentElement.clientWidth, document.body.clientWidth, window.innerWidth || 0),
        height = Math.max(document.documentElement.clientHeight, document.body.clientHeight, window.innerHeight || 0);

    return { width, height };
}

function getElementSizeByClassName(elementClassName) {
    if (!elementClassName) {
        throw new Error('Missing the HTML element CSS class name');
    }

    const elem = document.getElementsByClassName(elementClassName);
    if (!elem.length) {
        throw new Error(`The HTML element CSS class name '${elementClassName}' is not found`);
    }

    const width = elem[0].offsetWidth,
        height = elem[0].offsetHeight;

    return { width, height };
}

function getElementFontSize(elementName = 'html') {
    const elem = document.querySelector(elementName);
    return parseFloat(window.getComputedStyle(elem).fontSize); // Returns pixel
}

function calculatePxToEm(pxParam = 16, fractionDigits) {
    const result = pxParam / 16;
    return fractionDigits ? parseFloat(result).toFixed(fractionDigits) : result;
}

function calculatePtToEm(ptParam, fractionDigits) {
    const result = ptParam / 12;
    return fractionDigits ? parseFloat(result).toFixed(fractionDigits) : result;
}

function calculatePtToPx(ptParam, fractionDigits) {
    const result = (ptParam * 16) / 12;
    return fractionDigits ? parseFloat(result).toFixed(fractionDigits) : result;
}

function devicePixelRatio(fractionDigits) {
    const result = window.devicePixelRatio || 1;
    return fractionDigits ? parseFloat(result).toFixed(fractionDigits) : result;
}

const ScreenService = {
    viewportSize: getViewportSize,
    elementSizeByClassName: getElementSizeByClassName,
    elementFontSize: getElementFontSize,
    pxToEm: calculatePxToEm,
    ptToEm: calculatePtToEm,
    ptToPx: calculatePtToPx,
    devicePixelRatio: devicePixelRatio
}

export default ScreenService;