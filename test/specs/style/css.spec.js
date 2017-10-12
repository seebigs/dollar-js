(function () {

    describe(".css", function () {

        describe("handles all types of arguments", function () {

            it("gets style properties", function (expect) {
                expect($('.styles').css('backgroundColor')).toBe('rgb(34, 34, 34)');
            });

            it("sets one property", function (expect) {
                $('.styles').css('fontSize', '22px');
                expect($('.styles').css('fontSize')).toBe('22px');
            });

            it("sets multiple properties", function (expect) {
                $('.styles').css({
                    fontSize: '22px',
                    borderRadius: '5px'
                });
                expect($('.styles').css('fontSize')).toBe('22px');
                expect($('.styles').css('borderRadius')).toBe('5px');
            });

            it("returns empty string or default value when no property is set", function (expect) {
                var unstyled = $('.styles').css('border');
                expect(unstyled === '' || unstyled === '0px none rgb(0, 0, 0)').toBe(true);
            });

            it("handles function as a value", function (expect) {
                $('.styles').css('padding', function (oldVal, i) {
                    return (parseInt(oldVal) + i + 1) + 'px';
                });
                expect($('.styles').css('padding')).toBe('34px');
            });

            it('gracefully noOps on getting css from empty dollar collections', function(expect) {

                var errThrownOnGet = false;
                try {
                    $().css('display');
                } catch (e) {
                    errThrownOnGet = true;
                }
                expect(errThrownOnGet).toBe(false);
            });

            it('gracefully noOps on setting css on empty dollar collections', function(expect) {

                var errThrownOnSet = false;
                try {
                    $().css('display', 'block');
                } catch (e) {
                    errThrownOnSet = true;
                }
                expect(errThrownOnSet).toBe(false);
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance (when setting)", function (expect) {
                expect($('.styles').css('foo','bar').isDollar).toBe(true);
            });
        });

    });

})();
