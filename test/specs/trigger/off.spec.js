(function () {

    describe(".off", function () {

        describe("removes an event listener", function () {

            it("clears all previously-bound event listeners", function (expect) {
                var clicked = false;
                $('#slim_shady').click(function () {
                    clicked = true;
                });
                $('#slim_shady').off('click');
                $('#slim_shady').click();
                expect(clicked).toBe(false);
            });

            it("clears one previously-bound event listener", function (expect) {
                var clicked1 = false;
                var clicked2 = false;

                function clickOne () {
                    clicked1 = true;
                }

                function clickTwo () {
                    clicked2 = true;
                }

                $('#slim_shady').on('click', clickOne);
                $('#slim_shady').on('click', clickTwo);

                $('#slim_shady').off('click', clickOne);

                $('#slim_shady').click();
                expect(clicked1).toBe(false);
                expect(clicked2).toBe(true);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').off('foo', function () {}).isDollar).toBe(true);
            });
        });

    });

})();
