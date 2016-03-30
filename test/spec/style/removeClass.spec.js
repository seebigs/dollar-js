(function () {

    describe(".removeClass", function () {

        describe("removes the specified classes", function () {

            it("removes all classes when no value is passed", function () {
                $('.styles').removeClass();
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('');
                });
            });

            it("removes classes when String is passed", function () {
                $('.styles').addClass('one two three');
                $('.styles').removeClass('two');
                $('.styles').each(function (el, i) {
                    expect(el.className).not.toBe('');
                    expect(el.className.indexOf(' two ')).toBe(-1);
                });
            });

            it("removes classes when Array is passed", function () {
                $('.styles').addClass('one two three four');
                $('.styles').removeClass(['two','three']);
                $('.styles').each(function (el, i) {
                    expect(el.className).not.toBe('');
                    expect(el.className.indexOf(' two ')).toBe(-1);
                    expect(el.className.indexOf(' three ')).toBe(-1);
                });
            });

            it("removes classes when Function is passed", function () {
                $('.styles').addClass('one two three');
                $('.styles').removeClass(function (i, old) {
                    return 'preexisting' + i;
                });
                $('.styles').each(function (el, i) {
                    expect(el.className).toBe('styles one two three');
                });
            });

            it("avoids partial matches", function () {
                $('.styles').addClass('one twothree');
                $('.styles').removeClass('two');
                $('.styles').each(function (el, i) {
                    expect(el.className.indexOf('one twothree')).not.toBe(-1);
                });
            });

        });

    });

})();
