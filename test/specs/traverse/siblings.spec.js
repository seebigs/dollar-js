(function () {

    describe(".siblings", function () {

        describe("finds sibling nodes of the matched elements", function () {

            it("finds them all", function (expect) {
                expect($('h2').siblings().length).toBe(jQuery('#headings').children().length);
            });

            it("filters them by selector", function (expect) {
                expect($('h2').siblings('h3')).toMatchElements(jQuery('h3', '#headings'));
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').siblings().isDollar).toBe(true);
            });
        });

    });

})();
