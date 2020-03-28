(function () {

    describe(".width", function () {

        describe("returns the computed width of the first matched element", function () {

            it("returns the correct numerical width without units", function (expect) {
                jQuery('.mutate').css({ width: '333px' });
                expect($('.mutate').width()).toBe(333);
            });

        });

        describe("special elements", function () {

            it("works on window", function (expect) {
                expect($(window).width()).toBe(jQuery(window).width());
            });

            it("works on document", function (expect) {
                expect($(document).width()).toBe(jQuery(document).width());
            });

        });

    });

})();
