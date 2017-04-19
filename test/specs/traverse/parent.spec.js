(function () {

    describe(".parent", function () {

        var emptyDollar = $();

        describe("find the parent of each matched element", function () {

            it("gets the parent node", function (expect) {
                var $p = $('.sel-descendant').parent();
                expect($p[0].nodeName).toBe('P');
                expect($p[1].className).toBe('sel-descendant sel-child');
            });

            it("empties when it runs out of siblings", function (expect) {
                expect($('body').parent().parent().parent()).toEqual(emptyDollar);
            });

            it("filters by selector", function (expect) {
                expect($('.list-item').parent('#top_list')).toMatchElements('#top_list');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('#slim_shady').parent().isDollar).toBe(true);
            });
        });

    });

})();
