
var benchmark = module.parent.benchmark;

var $sel = $('body');
var jQsel = jQuery('body');

benchmark.add('Dollar', function() {
    $sel.html('<div id="foo"><span class="bar"></span></div>');
    $sel.html();
    $sel.html('');
});

benchmark.add('jQuery', function() {
    jQsel.html('<div id="foo"><span class="bar"></span></div>');
    jQsel.html();
    jQsel.html('');
});
