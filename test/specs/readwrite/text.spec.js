(function () {

    describe(".text", function () {

        describe("handles all types of arguments", function () {

            it("returns text when no args provided", function (expect) {
                // for one element
                expect($('.sel-hidden').text()).toBe('Can You See Me?');
                // combined across child nodes
                expect($('#mutate').text()).toBe(jQuery('#mutate').text());
            });

            it("sets text", function (expect) {
                $('#slim_shady').text('please stand up');
                expect(document.getElementById('slim_shady').innerHTML).toBe('please stand up');
            });

            it("handles function as insertion", function (expect) {
                $('.sel-hidden').text(function (oldVal, i) {
                    return 'now' + i + oldVal;
                });
                expect($('.sel-hidden').text()).toBe('now0Can You See Me?');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('.wonka').text('foo').isDollar).toBe(true);
            });
        });

    });

})();
