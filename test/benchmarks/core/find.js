var i = 0,
    len = selectors.length,
    j = 0,
    node = document.getElementById('container');

suite('find', function () {


    benchmark('jQuery all string selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                jQuery(selectors[i]).find(selectors[j]);
            }
        }
    });

    benchmark('dollar all string selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                $(selectors[i]).find(selectors[j]);
            }
        }
    });

    benchmark('jQuery all jQuery instances w selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                jQuery(selectors[i]).find(jQuery(selectors[j]));
            }
        }
    });

    benchmark('dollar all instances w selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                $(selectors[i]).find($(selectors[j]));
            }
        }
    });

    benchmark('jQuery all nodes w selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                jQuery(selectors[i]).find(jQuery(selectors[j])[0]);
            }
        }
    });

    benchmark('dollar all nodes w selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                $(selectors[i]).find($(selectors[j])[0]);
            }
        }
    });
});