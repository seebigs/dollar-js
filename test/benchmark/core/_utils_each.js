
var benchmark = module.parent.benchmark;

var arr = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0];
var obj = { a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:0 };

benchmark.add('Dollar.utils.each', function() {
    $.utils.each(arr, function () {});
    $.utils.each(obj, function () {});
});

benchmark.add('jQuery.each', function() {
    jQuery.each(arr, function () {});
    jQuery.each(obj, function () {});
});
