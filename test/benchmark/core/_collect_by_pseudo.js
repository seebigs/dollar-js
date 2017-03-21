
var benchmark = module.parent.benchmark;

benchmark.add('Dollar', function() {
    $('button:disabled');
    $('button:hidden');
    $('li:odd');
    $('a:contains("HYPER")');
});

benchmark.add('jQuery', function() {
    jQuery('button:disabled');
    jQuery('button:hidden');
    jQuery('li:odd');
    jQuery('a:contains("HYPER")');
});
