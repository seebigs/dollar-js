
var benchmark = module.parent.benchmark;

var $b = $('body');
var jb = jQuery('body');

// console.log($b[0].innerHTML);

benchmark.add('quick1', function() {
    // $('body');
});

benchmark.add('long1', function() {
    for (var i=0; i<10000; i++) {
        25 * 25;
    }
});
