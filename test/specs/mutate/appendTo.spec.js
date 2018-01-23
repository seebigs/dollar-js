(function () {

    describe(".appendTo", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function (expect) {
                $('').appendTo('#mutate');
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function (expect) {
                    $(sel).appendTo('#mutate');
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles HTMLString (single tag) as content", function (expect) {
                expect(jQuery('h1', '#mutate').length).toBe(0);
                $('<h1></h1>').appendTo('#mutate');
                expect(jQuery('h1', '#mutate').length).toBe(1);
            });

            it("handles multiple HTMLString as content", function (expect) {
                expect(jQuery('h1', '#mutate').length).toBe(0);
                expect(jQuery('h2', '#mutate').length).toBe(0);
                $('<h1></h1>, <h2></h2>').appendTo('#mutate');
                expect(jQuery('h1', '#mutate').length).toBe(1);
                expect(jQuery('h2', '#mutate').length).toBe(1);
            });

            it("handles HTMLString (multi tag) as content", function (expect) {
                expect(jQuery('h1', '#mutate').length).toBe(0);
                $('<div><h1></h1></div>').appendTo('#mutate');
                expect(jQuery('div h1', '#mutate').length).toBe(1);
            });

            it("handles Element as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newAppend';
                $(elem).appendTo('#mutate');
                expect(jQuery('.newAppend').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function (expect) {
                $($('<div class="newAppend">')).appendTo('#mutate');
                expect(jQuery('.newAppend').length).toBe(1);
            });
        });

        describe("inserts new content at bottom", function () {

            it("adds content at bottom of each", function (expect) {
                $('<span class="newAppend">').appendTo('.mutate');
                expect(jQuery('.newAppend').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(6);
                expect(jQuery('*', '.mutate')[1].className).toBe('newAppend');
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                var $el = $('<p>foo</p>').appendTo('.wonka');
                expect($el.isDollar).toBe(true);
            });
        });

    });

})();
