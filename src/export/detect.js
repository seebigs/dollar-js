
/****************/
/*    EXPORT    */
/****************/

/**
 * Export using whatever method is best
 * module.exports
 * window.$
 */
(function () {

    var win = window;

    // AMD loader
    if (typeof win.define === fnType && win.define.amd) {
        win.define(function () {
            return $;
        });

    // Node.js
} else if (typeof module !== 'undefined' && module.exports) {
        module.exports = $;

    // Global window
    } else {
        win.$ = $;
    }

}.call(this));
