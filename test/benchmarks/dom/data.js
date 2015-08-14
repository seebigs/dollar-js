var i = 0,
    len = selectors.length,
    j = 0,
    node = document.getElementById('container');

suite('data', function () {

    benchmark('jQuery all string selectors - no params', function () {
        for (; i < len; i++) {
            jQuery(selectors[i]).data();
        }
    });

    benchmark('dollar all string selectors - no params', function () {
        for (; i < len; i++) {
            $(selectors[i]).data();
        }
    });

    benchmark('jQuery all string selectors', function () {
        for (; i < len; i++) {
            jQuery(selectors[i]).data('foo', [123]);
        }
    });

    benchmark('dollar all string selectors', function () {
        for (; i < len; i++) {
            $(selectors[i]).data('foo', [123]);
        }
    });
});