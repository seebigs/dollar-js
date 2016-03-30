(function () {

    describe(".on", function () {

        describe("binds an event listener", function () {

            it("hears when a bound event is triggered", function () {
                var clicked = false;
                $('#slim_shady').on('click', function () {
                    clicked = true;
                });
                $('#slim_shady').click();
                expect(clicked).toBe(true);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($('#slim_shady').on('foo', function () {}).isDollar).toBe(true);
            });
        });

    });

})();
