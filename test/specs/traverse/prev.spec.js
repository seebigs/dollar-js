(function () {

    describe(".prev", function () {

        var emptyDollar = $();

        describe("find the previous sibling in the DOM", function () {

            it("gets the previous node", function (expect) {
                expect($('#first_section').prev()).toMatchElements('#good');
                expect($('#first_section').prev().prev()).toMatchElements('#multiple2');
            });

            it("empties when it runs out of siblings", function (expect) {
                expect($('#top_list').prev()).toEqual(emptyDollar);
            });

            it("filters by selector", function (expect) {
                expect($('#first_section').prev('#good')).toMatchElements('#good');
                expect($('#first_section').prev('.bad')).toEqual(emptyDollar);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').prev().isDollar).toBe(true);
            });
        });

    });

})();
