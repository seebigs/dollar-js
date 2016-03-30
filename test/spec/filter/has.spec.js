(function () {

    describe(".has", function () {

        var emptyDollar = $();
        var $b = $('body');

        describe("handles all types of selectors", function () {

            it("handles no selector", function () {
                expect($b.has()).toEqual(emptyDollar);
            });

            jQuery.each(SPEC.selectors.ignored, function (name, sel) {
                it("handles " + name + " as selector", function () {
                    expect($b.has(sel)).toEqual(emptyDollar);
                });
            });

            it("handles Element as selector", function () {
                var elem = document.getElementById('slim_shady');
                expect($b.has(elem).get()).toEqual($b.get());
            });

            it("handles function as selector", function () {
                expect($b.has(function () {})).toEqual(emptyDollar);
            });

        });

        describe("avoids accidental matches", function () {
            it("body does not have '#bad'", function () {
                expect($b.has('#bad')).toEqual(emptyDollar);
            });
        });

        describe("matches valid selectors", function () {
            jQuery.each(SPEC.selectors.matchJQuery, function (sel, match) {
                it("body has " + sel, function () {
                    expect($b.has(sel).get()).toEqual($b.get());
                });
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($b.has('foo').isDollar).toBe(true);
            });
        });

    });

})();
