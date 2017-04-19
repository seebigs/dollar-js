(function () {

    describe(".eq", function () {

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            var elem = document.getElementById('slim_shady');

            it("handles no selector", function (expect) {
                expect($('section').eq()).toEqual(emptyDollar);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($('section').eq(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($('section').eq($('a'))).toEqual(emptyDollar);
            });

            it("handles Element as selector", function (expect) {
                expect($('section').eq(elem)).toEqual(emptyDollar);
            });

            it("handles function as selector", function (expect) {
                expect($('section').eq(function () {})).toEqual(emptyDollar);
            });

        });

        describe("returns the matched element at a given index", function () {

            it("gets a zero index", function (expect) {
                expect($('section').eq(0)).toMatchElements('#first_section');
                expect($('section').eq('0')).toMatchElements('#first_section');
            });

            it("gets a positive index", function (expect) {
                expect($('section').eq(1)).toMatchElements('#middle_section');
                expect($('section').eq('1')).toMatchElements('#middle_section');
            });

            it("gets a negative index", function (expect) {
                expect($('section').eq(-1)).toMatchElements('#last_section');
                expect($('section').eq('-1')).toMatchElements('#last_section');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('section').eq(0).isDollar).toBe(true);
            });
        });

    });

})();
