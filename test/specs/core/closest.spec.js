(function () {

    describe(".closest", function () {

        var contextSelector = SELECTORS.contextSelector;

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            it("handles no selector", function (expect) {
                expect($(contextSelector).closest()).toEqual(emptyDollar);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($(contextSelector).closest(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($(contextSelector).closest($('article')).get()).toEqual($('article').get());
            });

            it("handles Node as selector", function (expect) {
                expect($(contextSelector).closest(document)[0]).toEqual(document);
            });

            it("handles Element as selector", function (expect) {
                var elem = document.getElementById('top_list');
                expect($(contextSelector).closest(elem)[0]).toEqual(elem);
            });

        });

        describe("finds closest elements", function () {
            jQuery.each(SELECTORS.context, function (sel) {
                it("matches '" + sel + "' as selector", function (expect) {
                    expect($(contextSelector).closest(sel)).toMatchElements('#top_list');
                });
            });
        });

        describe("finds within context", function () {
            jQuery.each(SELECTORS.context, function (context) {
                it("within '" + context + "' as context", function (expect) {
                    expect($(contextSelector).closest('ul', context)).toMatchElements(jQuery('#top_list ul'));
                });
            });
        });

        describe("handles all types of context", function () {

            var emptyDollar = $();

            jQuery.each(SELECTORS.ignored, function (name, context) {
                it("handles " + name + " as context", function (expect) {
                    expect($(contextSelector).closest(context)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as context", function (expect) {
                expect($(contextSelector).closest($('article')).get()).toEqual($('article').get());
            });

            it("handles Node as context", function (expect) {
                expect($(contextSelector).closest(document)[0]).toEqual(document);
            });

            it("handles Element as context", function (expect) {
                var elem = document.getElementById('top_list');
                expect($(contextSelector).closest(elem)[0]).toEqual(elem);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($(contextSelector).closest('foo').isDollar).toBe(true);
            });
        });

    });

})();
