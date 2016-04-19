
var benchmark = module.parent.benchmark;

var $li = $('li');
var jQli = jQuery('li');

benchmark.add('Dollar', function() {
    $li[3];
    $li.get(3);
    $li.get();
});

benchmark.add('jQuery', function() {
    jQli[3];
    jQli.get(3);
    jQli.get();
});
