(function () {

    describe(".hasClass", function () {

        describe("finds the specified classes", function () {

            it("does not alter existing class names", function (expect) {
                $('.styles').hasClass();
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles preexisting' + i);
                });
            });

            it("returns true when styles have been added", function (expect) {
                $('.styles').addClass('one two three');
                expect($('.styles').hasClass('two')).toBe(true);
            });

            it("returns false when no match is found", function (expect) {
                expect($('.styles').hasClass('two')).toBe(false);
            });

            it("avoids partial matches", function (expect) {
                $('.styles').addClass('one twothree');
                expect($('.styles').hasClass('two')).toBe(false);
            });

        });

    });

})();
