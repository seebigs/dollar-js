(function () {

    describe(".append", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function (expect) {
                $('.mutate').append();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function (expect) {
                    $('.mutate').append(sel);
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
                elem.className = 'newAppend';
                $('#mutate').append(elem);
                expect(jQuery('.newAppend').get()).toEqual([elem]);
            });

            it("handles DocumentFragment as content", function (expect) {
                var frag = document.createDocumentFragment();
                var elem = document.createElement('div');
                elem.className = 'newAppend';
                frag.appendChild(elem);
                $('#mutate').append(frag);
                expect(jQuery('.newAppend', '#mutate').length).toEqual(1);
            });

            it("handles dollar instance as content", function (expect) {
                $('#mutate').append($('<div class="newAppend">'));
                expect(jQuery('.newAppend').length).toBe(1);
            });

            it("handles function as content", function (expect) {
                $('.mutate').append(function () {
                    return '<div class="newAppend"></div>';
                });
                expect(jQuery('.newAppend').length).toBe(3);
            });

            it("handles Array as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newAppend';
                var creator = function () {
                    return '<div class="newAppend"></div>';
                };
                $('#mutate').after([elem, creator]);
                expect(jQuery('.newAppend').length).toEqual(2);
            });

        });

        describe("inserts new content at bottom", function () {

            it("adds content at bottom of each", function (expect) {
                $('.mutate').append('<span class="newAppend">');
                expect(jQuery('.newAppend').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(6);
                expect(jQuery('*', '.mutate')[1].className).toBe('newAppend');
            });

            it("takes multiple args", function (expect) {
                $('.mutate').append('<div class="newAppend">', '<a class="newAppend">', '<span class="newAppend">');
                expect(jQuery('.newAppend').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').append('foo').isDollar).toBe(true);
            });
        });

    });

})();
