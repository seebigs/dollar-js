var i = 0,
    len = selectors.length,
    j = 0,
    node = document.getElementById('container');

suite('next', function () {

    benchmark('jQuery all string selectors - no params', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                jQuery(selectors[i]).next();
            }
        }
    });

    benchmark('dollar all string selectors - no params', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                $(selectors[i]).next();
            }
        }
    });

    benchmark('jQuery all string selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                jQuery(selectors[i]).next(selectors[j]);
            }
        }
    });

    benchmark('dollar all string selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                $(selectors[i]).next(selectors[j]);
            }
        }
    });
});