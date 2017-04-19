(function () {

    describe(".each", function () {

        describe("iterates over each element in a dollar instance", function () {

            it("executes the correct number of times", function (expect) {
                var times = 0;
                $('section').each(function () { times++; });
                expect(times).toBe(3);
            });

            it("drops out when return false", function (expect) {
                var times = 0;
                $('section').each(function () { times++; return false; });
                expect(times).toBe(1);
            });

            it("passes the correct args to iteratee", function (expect) {
                var args = [];
                $('#slim_shady').each(function (elem, index) {
                    args.push(this);
                    args.push(elem);
                    args.push(index);
                });
                expect(args).toEqual([
                    document.getElementById('slim_shady'),
                    document.getElementById('slim_shady'),
                    0
                ]);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').each(function () {}).isDollar).toBe(true);
            });
        });

    });

})();
