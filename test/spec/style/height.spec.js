(function () {

    describe(".height", function () {

        describe("returns the computed height of the first matched element", function () {

            it("returns the correct numerical height without units", function () {
                jQuery('.mutate').css({ height: '222px' });
                expect($('.mutate').height()).toBe(222);
            });

        });

    });

})();
