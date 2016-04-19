
var benchmark = module.parent.benchmark;

benchmark.add('Dollar', function() {
    $('.mutate');
    $('.bad');
});

benchmark.add('jQuery', function() {
    jQuery('.mutate');
    jQuery('.bad');
});
