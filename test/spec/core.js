var Benchmark = require('benchmark'),
    suite = new Benchmark.Suite();

// console.log('core!')

// var Benchmark = require('benchmark')

suite
    .add('RegExp#test', function () {
        /o/.test('Hello World!');
    })
    .add('String#indexOf', function() {
        'Hello World!'.indexOf('o') > -1;
    })
    .add('String#match', function() {
        !!'Hello World!'.match(/o/);
    })

module.exports = suite;