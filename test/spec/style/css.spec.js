(function () {

    describe(".css", function () {

        describe("handles all types of arguments", function () {

            it("gets style properties", function () {
                expect($('.styles').css('backgroundColor')).toBe('rgb(34, 34, 34)');
            });

            it("sets one property", function () {
                $('.styles').css('fontSize', '22px');
                expect($('.styles').css('fontSize')).toBe('22px');
            });

            it("sets multiple properties", function () {
                $('.styles').css({
                    fontSize: '22px',
                    borderRadius: '5px'
                });
                expect($('.styles').css('fontSize')).toBe('22px');
                expect($('.styles').css('borderRadius')).toBe('5px');
            });

            it("returns empty string when no property is set", function () {
                expect($('.styles').css('border')).toBe('');
            });

            it("handles function as a value", function () {
                $('.styles').css('padding', function (i, oldVal) {
                    return (parseInt(oldVal) + i + 1) + 'px';
                });
                expect($('.styles').css('padding')).toBe('34px');
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function () {
                expect($('.styles').css('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();
