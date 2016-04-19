(function () {

    describe(".prepend", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function () {
                $('.mutate').prepend();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function () {
                    $('.mutate').prepend(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles Element as content", function () {
                var elem = document.createElement('div');
                elem.className = 'newPrepend';
                $('#mutate').prepend(elem);
                expect(jQuery('.newPrepend').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function () {
                $('#mutate').prepend($('<div class="newPrepend">'));
                expect(jQuery('.newPrepend').length).toBe(1);
            });

            it("handles function as content", function () {
                $('.mutate').prepend(function () {
                    return '<div class="newPrepend"></div>';
                });
                expect(jQuery('.newPrepend').length).toBe(3);
            });

        });

        describe("inserts new content at top", function () {

            it("adds content at top of each", function () {
                $('.mutate').prepend('<span class="newPrepend">');
                expect(jQuery('.newPrepend').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(6);
                expect(jQuery('*', '.mutate')[0].className).toBe('newPrepend');
            });

            it("takes multiple args", function () {
                $('.mutate').prepend('<div class="newPrepend">', '<a class="newPrepend">', '<span class="newPrepend">');
                expect(jQuery('.newPrepend').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($('.wonka').prepend('foo').isDollar).toBe(true);
            });
        });

    });

})();
