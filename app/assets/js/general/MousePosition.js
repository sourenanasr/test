// https://plainjs.com/javascript/events/getting-the-current-mouse-position-16/
function handlerMousePosition(e) {
    e = e || window.event;

    var pageX = e.pageX;
    var pageY = e.pageY;

    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {pageX, pageY}
}

export {handlerMousePosition}