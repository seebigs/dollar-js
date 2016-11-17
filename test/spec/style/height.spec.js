(function () {

    describe(".height", function () {

        describe("returns the computed height of the first matched element", function () {

            it("returns the correct numerical height without units", function () {
                jQuery('.mutate').css({ height: '222.333px' });
                expect($('.mutate').height()).toBe(222.333);
            });

        });

    });

})();
