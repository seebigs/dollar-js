
var benchmark = module.parent.benchmark;

var $sel = $(SELECTORS.contextSelector);
var jQsel = jQuery(SELECTORS.contextSelector);

var sels = Object.keys(SELECTORS.context);
var i, len = sels.length;

benchmark.add('Dollar', function() {
    for (i = 0; i < len; i++) {
        $sel.closest(sels[i]);
    }
});

benchmark.add('jQuery', function() {
    for (i = 0; i < len; i++) {
        jQsel.closest(sels[i]);
    }
});
