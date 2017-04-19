(function () {

    describe(".first", function () {

        describe("reduce to the first element in the collection", function () {

            it("there can be only one", function (expect) {
                expect($('section').first()).toMatchElements('#first_section');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').first().isDollar).toBe(true);
            });
        });

    });

})();
