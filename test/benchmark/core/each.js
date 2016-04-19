
var benchmark = module.parent.benchmark;

var $li = $('li');
var jQli = jQuery('li');

benchmark.add('Dollar', function() {
    $li.each(function () {});
});

benchmark.add('jQuery', function() {
    jQli.each(function () {});
});
