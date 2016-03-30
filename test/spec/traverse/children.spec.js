(function () {

    describe(".children", function () {

        describe("finds child nodes of the matched elements", function () {

            it("finds them all", function () {
                expect($('#mutate').children()).toMatchElements('.mutate');
            });

            it("filters them by selector", function () {
                expect($('#first_section').children('article')).toMatchElements('#top_list');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($('#slim_shady').children().isDollar).toBe(true);
            });
        });

    });

})();
