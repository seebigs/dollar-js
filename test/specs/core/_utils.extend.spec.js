(function () {

    describe("utils.extend", function () {

        describe("when given two objects", function () {

            it("combines properties from both into one object", function (expect) {
                expect($.utils.extend({ bat: 'man' }, { super: 'man' })).toEqual({ bat: 'man', super: 'man' });
            });

            it("modifies the first object directly", function (expect) {
                var obj = { bat: 'man' };
                $.utils.extend(obj, { super: 'man' });
                $.utils.extend(obj, { sand: 'man' });
                expect(obj).toEqual({ bat: 'man', super: 'man', sand: 'man' });
            });

            it("overwrites the first with the second", function (expect) {
                expect($.utils.extend({ bat: 'man' }, { bat: 'girl' })).toEqual({ bat: 'girl' });
            });

        });

    });

})();
