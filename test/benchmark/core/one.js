
var benchmark = module.parent.benchmark;

var $b = $('body');
var jb = jQuery('body');

// console.log($b[0].innerHTML);

benchmark.add('same1', function() {
    // $('body');
});

benchmark.add('same2', function() {
    // jQuery('body');
});
