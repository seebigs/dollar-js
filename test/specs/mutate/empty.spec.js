(function () {

    describe(".empty", function () {

        describe("empties all elements", function () {

            it("clears contents of each", function (expect) {
                $('.mutate').empty();
                var els = jQuery('.mutate').get();
                els.forEach(function(el) {
                    expect(el.innerHTML).toBe('');
                });
            });

            it("clears child nodes", function (expect) {
                $('.mutate').empty();
                var els = jQuery('.mutate').get();
                els.forEach(function(el) {
                    expect(el.childNodes.length).toBe(0);
                });
            });

            it("does not alter the element itself", function (expect) {
                var el = document.getElementById('mutate');
                $('#mutate').empty();
                expect(el).toBe(document.getElementById('mutate'));
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#mutate').empty().isDollar).toBe(true);
            });
        });

    });

})();
