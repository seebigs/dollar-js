(function () {

    describe(".filter", function () {

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            it("handles no selector", function (expect) {
                expect($('*').filter()).toEqual(emptyDollar);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($('*').filter(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($('*').filter($('a')).get()).toEqual($('a').get());
            });

            it("handles Element as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($('*').filter(elem)[0]).toEqual(elem);
            });

            it("handles function as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($('*').filter(function (elem, i) {
                    return elem.id === 'slim_shady';
                })).toMatchElements('#slim_shady');
            });

        });

        describe("avoids accidental matches", function () {
            jQuery.each(SELECTORS.nomatch, function (i, sel) {
                it("does not match '" + sel + "'", function (expect) {
                    expect($('*').filter(sel).length).toBe(0);
                });
            });
        });

        describe("matches our DOM", function () {
            jQuery.each(SELECTORS.matchJQuery, function (sel, match) {
                it("matches '" + sel + "'", function (expect) {
                    expect($('*').filter(sel)).toMatchElements(match);
                });
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('*').filter('foo').isDollar).toBe(true);
            });
        });

    });

})();
