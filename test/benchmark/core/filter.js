
var benchmark = module.parent.benchmark;

var $li = $('li');
var jQli = jQuery('li');

benchmark.add('Dollar', function() {
    $li.filter('#mutate');
    $li.filter('.sel-in-context-div');
    $li.filter('p');
});

benchmark.add('jQuery', function() {
    jQli.filter('#mutate');
    jQli.filter('.sel-in-context-div');
    jQli.filter('p');
});
