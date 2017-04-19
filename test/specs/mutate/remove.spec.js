(function () {

    describe(".remove", function () {

        describe("deletes elements from the DOM", function () {

            it("removes each in collection", function (expect) {
                $('.mutate').remove();
                expect(jQuery('.mutate').length).toBe(0);
            });

            it("removes child nodes too", function (expect) {
                $('#mutate').remove();
                expect(jQuery('.mutate').length).toBe(0);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#mutate').remove().isDollar).toBe(true);
            });
        });

    });

})();
