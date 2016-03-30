(function () {

    describe(".is", function () {

        describe("handles all types of selectors", function () {

            it("handles no selector", function () {
                expect($('#slim_shady').is()).toBe(false);
            });

            jQuery.each(SPEC.selectors.ignored, function (name, sel) {
                it("handles " + name + " as selector", function () {
                    expect($('#slim_shady').is(sel)).toBe(false);
                });
            });

            it("handles dollar instance as selector", function () {
                expect($('#slim_shady').is($('div'))).toBe(true);
            });

            it("handles Element as selector", function () {
                var elem = document.getElementById('slim_shady');
                expect($('#slim_shady').is(elem)).toBe(true);
            });

            it("handles function as selector", function () {
                var elem = document.getElementById('slim_shady');
                expect($('#slim_shady').is(function () {
                    return this === elem;
                })).toBe(true);
            });

        });

        describe("avoids accidental matches", function () {
            it("div is not body", function () {
                expect($('#slim_shady').is('body')).toBe(false);
            });
        });

        describe("matches valid selectors", function () {
            jQuery.each(SPEC.selectors.matchJQuery, function (sel, match) {
                it("at least one " + match + " is " + sel, function () {
                    expect($(match).is(sel)).toBe(true);
                });
            });
        });

    });

})();
