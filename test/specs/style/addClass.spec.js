(function () {

    describe(".addClass", function () {

        describe("adds the specified classes", function () {

            it("does not alter existing class names", function (expect) {
                $('.styles').addClass();
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles preexisting' + i);
                });
            });

            it("adds classes when passed a String", function (expect) {
                $('.styles').addClass('one two three');
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles preexisting' + i + ' one two three');
                });
            });

            it("adds classes when passed a function", function (expect) {
                $('.styles').addClass(function (oldVal, i) {
                    return 'now' + i + oldVal;
                });
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles preexisting' + i + ' now' + i + 'styles');
                });
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('.styles').addClass('foo').isDollar).toBe(true);
            });
        });

    });

})();
