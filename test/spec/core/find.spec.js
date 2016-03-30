(function () {

    describe(".find", function () {

        var $b = $(document.getElementsByTagName('body')[0]);

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            it("handles no selector", function () {
                expect($b.find()).toEqual(emptyDollar);
            });

            jQuery.each(SPEC.selectors.ignored, function (name, sel) {
                it("handles " + name + " as selector", function () {
                    expect($b.find(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function () {
                expect($b.find($('a')).get()).toEqual($('a').get());
            });

            it("handles Node as selector", function () {
                var textNode = document.createTextNode('text');
                expect($b.find(textNode)[0]).toEqual(textNode);
            });

            it("handles Element as selector", function () {
                var elem = document.getElementById('slim_shady');
                expect($b.find(elem)[0]).toEqual(elem);
            });

        });

        describe("only finds children", function () {

            it("matches children", function () {
                expect($('#top_list').find(SPEC.selectors.contextSelector)).toMatchElements('.sel-in-context-id');
            });

        });

        describe("avoids accidental matches", function () {
            jQuery.each(SPEC.selectors.nomatch, function (i, sel) {
                it("does not match '" + sel + "'", function () {
                    expect($b.find(sel).length).toBe(0);
                });
            });
        });

        describe("matches our DOM", function () {
            jQuery.each(SPEC.selectors.matchJQuery, function (sel, match) {
                it("matches '" + sel + "'", function () {
                    expect($b.find(sel)).toMatchElements(match);
                });
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($b.find('foo').isDollar).toBe(true);
            });
        });

    });

})();
