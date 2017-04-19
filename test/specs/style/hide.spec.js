(function () {

    describe(".hide", function () {

        function isHidden(el) {
            return window.getComputedStyle(el).display === 'none';
        }

        describe("hides all elements in collection", function () {

            it("adds the correct styling", function (expect) {
                $('.styles').each(function (el, i) {
                    expect(isHidden(el)).toBe(false);
                });
                $('.styles').hide();
                $('.styles').each(function (el, i) {
                    expect(isHidden(el)).toBe(true);
                });
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.styles').hide().isDollar).toBe(true);
            });
        });

    });

})();
