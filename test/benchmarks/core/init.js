var i = 0,
    len = selectors.length,
    node = document.getElementById('container');

suite('init', function () {

    benchmark('jQuery all string selectors', function () {
        for (; i < len; i++) {
            jQuery(selectors[i]);
        }
    });

    benchmark('dollar all string selectors', function () {
        for (; i < len; i++) {
            $(selectors[i]);
        }
    });

    benchmark('jQuery all jQuery instances w selectors', function () {
        for (; i < len; i++) {
            jQuery(jQuery(selectors[i]));
        }
    });

    benchmark('dollar all instances w selectors', function () {
        for (; i < len; i++) {
            $($(selectors[i]));
        }
    });

    benchmark('jQuery node', function () {
        jQuery(node);
    });

    benchmark('dollar node', function () {
        $(node);
    });
});