
var benchmark = module.parent.benchmark;

benchmark.add('Dollar', function() {
    $('#slim_shady');
    $('#bad');
});

benchmark.add('jQuery', function() {
    jQuery('#slim_shady');
    jQuery('#bad');
});
