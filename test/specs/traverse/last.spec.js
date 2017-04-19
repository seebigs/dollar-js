(function () {

    describe(".last", function () {

        describe("reduce to the last element in the collection", function () {

            it("there can be only one", function (expect) {
                expect($('section').last()).toMatchElements('#last_section');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').last().isDollar).toBe(true);
            });
        });

    });

})();
