(function () {

    describe(".map", function () {

        it("repopulates current set", function (expect) {
            var newSet = $('p span').map(function (el) {
                return el.parentNode;
            });
            expect(newSet.get()).toEqual(jQuery('#first_paragraph').add('span.sel-child').get());
        });

        it("is chainable", function (expect) {
            expect($('#first_section').map(function(el){ return el; }).isDollar).toBe(true);
        });

    });

})();
