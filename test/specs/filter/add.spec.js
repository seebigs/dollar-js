(function () {

    describe(".add", function () {

        it("merges results into current set", function (expect) {
            expect($('#first_section').add('#middle_section').add('#last_section')).toMatchElements('section');
        });

        it("is chainable", function (expect) {
            expect($('#first_section').add('foo').isDollar).toBe(true);
        });

    });

})();
