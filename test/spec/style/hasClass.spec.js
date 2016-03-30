(function () {

    describe(".hasClass", function () {

        describe("finds the specified classes", function () {

            it("does not alter existing class names", function () {
                $('.styles').hasClass();
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles preexisting' + i);
                });
            });

            it("returns true when styles have been added", function () {
                $('.styles').addClass('one two three');
                expect($('.styles').hasClass('two')).toBe(true);
            });

            it("returns false when no match is found", function () {
                expect($('.styles').hasClass('two')).toBe(false);
            });

            it("avoids partial matches", function () {
                $('.styles').addClass('one twothree');
                expect($('.styles').hasClass('two')).toBe(false);
            });

        });

    });

})();
