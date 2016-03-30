(function () {

    describe(".show", function () {

        function isHidden(el) {
            if (el.offsetParent === null) {
                return true;
            }
            return window.getComputedStyle(el).display === 'none';
        }

        describe("shows all elements in collection", function () {

            it("adds the correct styling", function () {
                $('.sel-hidden').each(function (el, i) {
                    expect(isHidden(el)).toBe(true);
                });
                $('.sel-hidden').show();
                $('.sel-hidden').each(function (el, i) {
                    expect(isHidden(el)).toBe(false);
                });
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($('.styles').show().isDollar).toBe(true);
            });
        });

    });

})();
