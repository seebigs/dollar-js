
var benchmark = module.parent.benchmark;

benchmark.add('Dollar', function() {
    $('#slim_shady, .mutate, p');
});

benchmark.add('jQuery', function() {
    jQuery('#slim_shady, .mutate, p');
});
