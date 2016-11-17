(function () {

    describe(".width", function () {

        describe("returns the computed width of the first matched element", function () {

            it("returns the correct numerical width without units", function () {
                jQuery('.mutate').css({ width: '333.444px' });
                expect($('.mutate').width()).toBe(333.444);
            });

        });

    });

})();
