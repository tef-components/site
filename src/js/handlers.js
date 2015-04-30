/**
 * Attach a handler of and specified kind of event in one element
 * @param {!Object} elem DOM element to attach the event callback
 * @param {!String} type String identifier of event type
 * @param {!Function} eventHandle Callback function
 */
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


/**
 * Get current max width of element set
 * @param {NodeList} elms Array of elements to work with
 * @return {number} Maximum width of 'elms'
 */
var getCurrentWidth = function(elms) {
    var res = 0;
    if (elms[0]) {
        res = elms[0].offsetWidth;
        for (var i = 1; i < elms.length; ++i) {
            var w = elms[i].offsetWidth;
            if (w > res) res = w;
        }
    }
    return res;
};


/**
 * Resize each highlight in the page to desired width
 */
var resizeHighlight = function() {
    if (document.getElementsByClassName) {
        var width = getCurrentWidth(document.getElementsByClassName('visualization-container'));
        width -= 55; // 10px of left and right padding, 31px of numbers column, 4px of container borders
        var strWidth = width + 'px';
        var elms = document.getElementsByTagName('PRE');
        for (var i = 0; i < elms.length; ++i) {
            elms[i].style.maxWidth = strWidth;
        }
    }
};


/**
 * Callback to handle errors loading or displaying SVG files
 * This method changes the format of element source
 * @param {Object<!onerror, !src>} element Element to work with
 * @param {String} newExtension New extension for element source (Default is png)
 */
var onSvgError = function(element, newExtension) {
    element.onerror = null;
    element.src = element.src.substr(0, element.src.length - 3) + (newExtension || 'png');
};


/**
 * Check if the browser can render svg files. If it can't, every img tag will change their extension
 * Browsers not supporting svg: IE(<9)
 */
var checkSvgCompatibility = function() {
    // http://stackoverflow.com/questions/10964966/detect-ie-version-in-javascript
    var ie = (function() {
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
        return v > 4 ? v : undef;
    }());
    if (ie < 9) {
        var i = document.getElementsByTagName('img'), j, y;
        for (j = i.length; j--;) {
            y = i[j].src;
            if (y.match(/svg$/)) {
                i[j].src = y.slice(0, -3) + 'png';
            }
        }
    }
};


addEvent(window, 'resize', resizeHighlight);
addEvent(window, 'load', resizeHighlight);
addEvent(window, 'load', checkSvgCompatibility);
