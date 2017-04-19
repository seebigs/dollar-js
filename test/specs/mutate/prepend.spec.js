(function () {

    describe(".prepend", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function (expect) {
                $('.mutate').prepend();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function (expect) {
                    $('.mutate').prepend(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles HTMLString (single tag) as content", function (expect) {
                expect(jQuery('h1', '#mutate').length).toBe(0);
                $('#mutate').append('<h1></h1>');
                expect(jQuery('h1', '#mutate').length).toBe(1);
            });

            it("handles HTMLString (multi tag) as content", function (expect) {
                expect(jQuery('h1', '#mutate').length).toBe(0);
                $('#mutate').append('<div><h1></h1></div>');
                expect(jQuery('div h1', '#mutate').length).toBe(1);
            });

            it("handles Element as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newPrepend';
                $('#mutate').prepend(elem);
                expect(jQuery('.newPrepend').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function (expect) {
                $('#mutate').prepend($('<div class="newPrepend">'));
                expect(jQuery('.newPrepend').length).toBe(1);
            });

            it("handles function as content", function (expect) {
                $('.mutate').prepend(function () {
                    return '<div class="newPrepend"></div>';
                });
                expect(jQuery('.newPrepend').length).toBe(3);
            });

            it("handles Array as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newPrepend';
                var creator = function () {
                    return '<div class="newPrepend"></div>';
                };
                $('#mutate').after([elem, creator]);
                expect(jQuery('.newPrepend').length).toEqual(2);
            });

        });

        describe("inserts new content at top", function () {

            it("adds content at top of each", function (expect) {
                $('.mutate').prepend('<span class="newPrepend">');
                expect(jQuery('.newPrepend').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(6);
                expect(jQuery('*', '.mutate')[0].className).toBe('newPrepend');
            });

            it("takes multiple args", function (expect) {
                $('.mutate').prepend('<div class="newPrepend">', '<a class="newPrepend">', '<span class="newPrepend">');
                expect(jQuery('.newPrepend').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').prepend('foo').isDollar).toBe(true);
            });
        });

    });

})();
