
var benchmark = module.parent.benchmark;

var s;
var sels = [];

for (s in SELECTORS.ignored) {
    sels.push(SELECTORS.ignored[s]);
}

SELECTORS.nomatch.forEach(function (bad) {
    sels.push(bad);
});

for (s in SELECTORS.matchJQuery) {
    sels.push(s);
}

sels.push(document.getElementById('slim_shady'));

var i, len = sels.length;


benchmark.add('Dollar', function() {
    for (i = 0, len = sels.length; i < len; i++) {
        $(sels[i]);
    }
});

benchmark.add('jQuery', function() {
    for (i = 0, len = sels.length; i < len; i++) {
        jQuery(sels[i]);
    }
});
