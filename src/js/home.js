var addEvent = function(elem, type, eventHandle) {
    if (elem === null || typeof(elem) === 'undefined') {
        return;
    }
    if (elem.addEventListener) {
        elem.addEventListener(type, eventHandle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, eventHandle);
    } else {
        elem['on' + type] = eventHandle;
    }
};

var scrollCallback = function() {
    var top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    var value = 100 - ((top / 4) || 0);
    document.getElementById('bg-circles').style.backgroundPosition = '0 ' + (value) + '%';
};

addEvent(window, 'scroll', scrollCallback);
