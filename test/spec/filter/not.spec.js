(function () {

    describe(".not", function () {

        var contextSelector = SELECTORS.contextSelector;

        describe("handles all types of selectors", function () {

            var elem = document.getElementById('top_list');

            it("handles no selector", function () {
                expect($(contextSelector).not()).toMatchElements($(contextSelector));
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function () {
                    expect($(contextSelector).not(sel)).toMatchElements($(contextSelector));
                });
            });

            it("handles dollar instance as selector", function () {
                expect($(contextSelector).not($('.top-list'))).toMatchElements(jQuery(contextSelector).not(jQuery('.top-list')));
            });

            it("handles Element as selector", function () {
                expect($(contextSelector).not(elem)).toMatchElements(jQuery(contextSelector).not(elem));
            });

            it("handles Array of Elements as selector", function () {
                expect($(contextSelector).not([elem, elem, elem])).toMatchElements(jQuery(contextSelector).not([elem, elem, elem]));
            });

            it("handles function as selector", function () {
                var fnTest = function () { return this.id === 'top_list'; };
                expect($(contextSelector).not(fnTest)).toMatchElements(jQuery(contextSelector).not(fnTest));
            });

        });

        describe("avoids accidental drops", function () {
            it("should keep all elements if nothing is matched", function () {
                expect($(contextSelector).get()).toEqual($(contextSelector).not('#bad').get());
            });
        });

        describe("drops valid matches", function () {
            var emptyDollar = $();
            jQuery.each(SELECTORS.matchJQuery, function (sel, match) {
                it("drops " + sel, function () {
                    expect($(match).not(sel)).toEqual(emptyDollar);
                });
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($(contextSelector).not('foo').isDollar).toBe(true);
            });
        });

    });

})();
