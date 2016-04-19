
var benchmark = module.parent.benchmark;

benchmark.add('Dollar', function() {
    $('li');
    $('bad');
});

benchmark.add('jQuery', function() {
    jQuery('li');
    jQuery('bad');
});
