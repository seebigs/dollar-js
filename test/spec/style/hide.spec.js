(function () {

    describe(".hide", function () {

        function isHidden(el) {
            if (el.offsetParent === null) {
                return true;
            }
            return window.getComputedStyle(el).display === 'none';
        }

        describe("hides all elements in collection", function () {

            it("adds the correct styling", function () {
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
            it("returns dollar instance", function () {
                expect($('.styles').hide().isDollar).toBe(true);
            });
        });

    });

})();
