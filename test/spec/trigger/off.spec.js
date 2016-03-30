(function () {

    describe(".off", function () {

        describe("removes an event listener", function () {

            it("clears a previously-bound event listener", function () {
                var clicked = false;
                $('#slim_shady').click(function () {
                    clicked = true;
                });
                $('#slim_shady').off('click');
                $('#slim_shady').click();
                expect(clicked).toBe(false);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($('#slim_shady').off('foo', function () {}).isDollar).toBe(true);
            });
        });

    });

})();
