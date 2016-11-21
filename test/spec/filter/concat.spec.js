(function () {

    describe(".concat", function () {

        it("merges results into current set", function () {
            var e1 = document.getElementById('middle_section');
            var e2 = document.getElementById('last_section');
            expect($('#first_section').concat([e1, e2], [e2])).toMatchElements('section');
        });

        it("is chainable", function () {
            expect($('#first_section').concat([]).isDollar).toBe(true);
        });

    });

})();
