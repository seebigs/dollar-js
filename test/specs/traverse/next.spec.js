(function () {

    describe(".next", function () {

        var emptyDollar = $();

        describe("find the next sibling in the DOM", function () {

            it("gets the next node", function (expect) {
                expect($('#first_section').next()).toMatchElements('#middle_section');
                expect($('#first_section').next().next()).toMatchElements('#last_section');
            });

            it("empties when it runs out of siblings", function (expect) {
                expect($('.mutate').next().next().next()).toEqual(emptyDollar);
            });

            it("filters by selector", function (expect) {
                expect($('#first_section').next()).toMatchElements('#middle_section');
                expect($('#first_section').next('.bad')).toEqual(emptyDollar);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').next().isDollar).toBe(true);
            });
        });

    });

})();
