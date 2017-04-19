(function () {

    describe(".concat", function () {

        it("merges results into current set", function (expect) {
            var e1 = document.getElementById('middle_section');
            var e2 = document.getElementById('last_section');
            expect($('#first_section').concat([e1, e2], [e2])).toMatchElements('section');
        });

        it("is chainable", function (expect) {
            expect($('#first_section').concat([]).isDollar).toBe(true);
        });

    });

})();
