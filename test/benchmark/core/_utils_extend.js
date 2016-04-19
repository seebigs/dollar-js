
var benchmark = module.parent.benchmark;

var obj = { a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:0 };

benchmark.add('Dollar.utils.extend', function() {
    $.utils.extend({ foo: 'bar' }, obj);
});

benchmark.add('jQuery.extend', function() {
    jQuery.extend({ foo: 'bar' }, obj);
});
