
var benchmark = module.parent.benchmark;

benchmark.add('Dollar', function() {
    $('button:disabled');
});

benchmark.add('jQuery', function() {
    jQuery('button:disabled');
});
