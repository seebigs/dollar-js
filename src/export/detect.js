
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

    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = $;

    // AMD loader
    } else if (typeof win.define === fnType && win.define.amd) {
        win.define(function () {
            return $;
        });

    // Global window
    } else {
        win.$ = $;
    }

}.call(this));
