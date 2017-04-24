describe("utils", function () {

    describe("isElement", function () {

        it("handles undefined", function (expect) {
            expect($.utils.isElement()).toBe(false);
        });

        it("returns false for non-elements", function (expect) {
            expect($.utils.isElement(window)).toBe(false);
        });

        it("returns true for elements", function (expect) {
            expect($.utils.isElement(document.getElementById('slim_shady'))).toBe(true);
        });

    });

});
