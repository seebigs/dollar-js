var i = 0,
    len = selectors.length,
    j = 0,
    node = document.getElementById('container');

suite('siblings', function () {

    benchmark('jQuery all string selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                jQuery(selectors[i]).siblings();
            }
        }
    });

    benchmark('dollar all string selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                $(selectors[i]).siblings();
            }
        }
    });

    benchmark('jQuery all string selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                jQuery(selectors[i]).siblings(selectors[j]);
            }
        }
    });

    benchmark('dollar all string selectors', function () {
        for (; i < len; i++) {
            for (; j < len; j++) {
                $(selectors[i]).siblings(selectors[j]);
            }
        }
    });
});