(function () {

    describe(".add", function () {

        it("merges results into current set", function () {
            expect($('#first_section').add('#middle_section').add('#last_section')).toMatchElements('section');
        });

        it("is chainable", function () {
            expect($('#first_section').add('foo').isDollar).toBe(true);
        });

    });

})();
