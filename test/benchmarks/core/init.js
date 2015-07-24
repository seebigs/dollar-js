suite('Array search', function () {
    benchmark('util.contains', function () {
        /o/.test('Hello World!');
    });

    benchmark('Array.indexOf', function () {
        'Hello World!'.indexOf('o') > -1;
    });
});