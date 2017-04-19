(function () {

    describe("utils.each", function () {
        var arr = [1, 2, 3];
        var obj = { abc: 123, def: 456 };

        describe("when given undefined", function () {
            var called = false;
            function cb () {
                called = true;
            }
            it("does not call the callback", function (expect) {
                $.utils.each(void 0, cb);
                expect(called).toBe(false);
            });
        });

        describe("when given an empty array", function () {
            var called = false;
            function cb () {
                called = true;
            }
            it("does not call the callback", function (expect) {
                $.utils.each([], cb);
                expect(called).toBe(false);
            });
        });

        describe("when given an array with length", function () {
            it("iterates the array", function (expect) {
                var actual = [],
                    expected = [
                        { ndx: 0, val: 1, col: arr },
                        { ndx: 1, val: 2, col: arr },
                        { ndx: 2, val: 3, col: arr }
                    ];
                $.utils.each(arr, function(v, k, c) {
                    actual.push({ ndx: k, val: v, col: c });
                });
                expect(actual).toEqual(expected);
            });
        });

        describe("when given an NodeList", function () {
            it("iterates the NodeList", function (expect) {
                var nl = document.querySelectorAll('body'),
                    actual = [],
                    expected = [
                        { ndx: 0, val: nl[0], col: nl }
                    ];
                $.utils.each(nl, function(v, k, c) {
                    actual.push({ ndx: k, val: v, col: c });
                });
                expect(actual).toEqual(expected);
            });
        });

        describe("when given an arguments object", function () {
            it("iterates the arguments", function (expect) {
                var each = $.utils.each;
                var actual = [];
                var expected;

                function someFn () {
                    expected = [
                        { ndx: 0, val: arguments[0], col: arguments },
                        { ndx: 1, val: arguments[1], col: arguments }
                    ];

                    each(arguments, function(v, k, c) {
                        actual.push({ ndx: k, val: v, col: c });
                    });
                }

                someFn('arg1', 'arg2');
                expect(actual).toEqual(expected);
            });
        });

        describe("when given an object", function () {
            it("iterates the object", function (expect) {
                var actual = [],
                    expected = [
                        { key: 'abc', val: 123, col: obj },
                        { key: 'def', val: 456, col: obj }
                    ];
                $.utils.each(obj, function(v, k, c) {
                    actual.push({ key: k, val: v, col: c });
                });
                expect(actual).toEqual(expected);
            });
        });

        describe("when given an object with length (jquery)", function () {
            it("iterates the object as it would an array", function (expect) {
                var jq = $('body'),
                    actual = [],
                    expected = [
                        { key: 0, val: jq.get(0), col: jq }
                    ];
                $.utils.each(jq, function(v, k, c) {
                    actual.push({ key: k, val: v, col: c });
                });
                expect(actual).toEqual(expected);
            });
        });

        describe("when an iteratee returns false", function () {
            it("drops out of the loop", function (expect) {
                var lastVal;
                $.utils.each(arr, function(v) {
                    lastVal = v;
                    return false;
                });
                expect(lastVal).toBe(1);
            });
        });
    });

})();
