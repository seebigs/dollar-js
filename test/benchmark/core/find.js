
var benchmark = module.parent.benchmark;

var $sel = $('body');
var jQsel = jQuery('body');

benchmark.add('Dollar', function() {
    $sel.find('#mutate');
    $sel.find('.sel-in-context-div');
    $sel.find('p');
});

benchmark.add('jQuery', function() {
    jQsel.find('#mutate');
    jQsel.find('.sel-in-context-div');
    jQsel.find('p');
});
