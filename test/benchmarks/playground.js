var testArr = $('p');

nodesListEach = function (callback) {
    var i = 0, len = this.length;
    for (; i < len; i++) {
        callback.call(this[i], i, this[i]);
    }
};

suite('playground', function () {

    benchmark('.each - fn call', function () {
        $('div').each( function (node) {
            return this;
        });
    });

    benchmark('.each - [idx]', function () {
        nodesListEach.call($('div'), function () {
            return this;
        });
    });

    benchmark('for loop', function () {
        var nodes = $('div'), i = 0, len = nodes.length;
        for (; i < len; i++) {
            nodes[i];
        }
    });
});