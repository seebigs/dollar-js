(function () {

    describe(".append", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function () {
                $('.mutate').append();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function () {
                    $('.mutate').append(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles Element as content", function () {
                var elem = document.createElement('div');
                elem.className = 'newAppend';
                $('#mutate').append(elem);
                expect(jQuery('.newAppend').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function () {
                $('#mutate').append($('<div class="newAppend">'));
                expect(jQuery('.newAppend').length).toBe(1);
            });

            it("handles function as content", function () {
                $('.mutate').append(function () {
                    return '<div class="newAppend"></div>';
                });
                expect(jQuery('.newAppend').length).toBe(3);
            });

        });

        describe("inserts new content at bottom", function () {

            it("adds content at bottom of each", function () {
                $('.mutate').append('<span class="newAppend">');
                expect(jQuery('.newAppend').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(6);
                expect(jQuery('*', '.mutate')[1].className).toBe('newAppend');
            });

            it("takes multiple args", function () {
                $('.mutate').append('<div class="newAppend">', '<a class="newAppend">', '<span class="newAppend">');
                expect(jQuery('.newAppend').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($('.wonka').append('foo').isDollar).toBe(true);
            });
        });

    });

})();
