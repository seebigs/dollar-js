(function () {

    describe(".removeClass", function () {

        describe("removes the specified classes", function () {

            it("removes all classes when no value is passed", function (expect) {
                var elems = $('.styles').get();
                $('.styles').removeClass();
                expect(elems[0].className).toBe('');
                expect(elems[1].className).toBe('');
            });

            it("removes classes when String is passed", function (expect) {
                $('.styles').addClass('one two three');
                $('.styles').removeClass('two');
                $('.styles').each(function (el, i) {
                    expect(el.className).not.toBe('');
                    expect(el.className.indexOf(' two ')).toBe(-1);
                });
            });

            it("removes classes when Array is passed", function (expect) {
                $('.styles').addClass('one two three four');
                $('.styles').removeClass(['two','three']);
                $('.styles').each(function (el, i) {
                    expect(el.className).not.toBe('');
                    expect(el.className.indexOf(' two ')).toBe(-1);
                    expect(el.className.indexOf(' three ')).toBe(-1);
                });
            });

            it("removes classes when Function is passed", function (expect) {
                $('.styles').addClass('one two three');
                $('.styles').removeClass(function (old, i) {
                    return 'preexisting' + i;
                });
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles one two three');
                });
            });

            it("avoids partial matches", function (expect) {
                $('.styles').addClass('one twothree');
                $('.styles').removeClass('two');
                $('.styles').each(function (el, i) {
                    expect(el.className.indexOf('one twothree')).not.toBe(-1);
                });
            });

        });

    });

})();
