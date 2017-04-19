(function () {

    describe(".before", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function (expect) {
                $('.mutate').before();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function (expect) {
                    $('.mutate').before(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles Element as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newBefore';
                $('#mutate').before(elem);
                expect(jQuery('.newBefore').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function (expect) {
                $('#mutate').before($('<div class="newBefore">'));
                expect(jQuery('.newBefore').length).toBe(1);
            });

            it("handles function as content", function (expect) {
                $('.mutate').before(function () {
                    return '<div class="newBefore"></div>';
                });
                expect(jQuery('.newBefore').length).toBe(3);
            });

            it("handles Array as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newBefore';
                var creator = function () {
                    return '<div class="newBefore"></div>';
                };
                $('#mutate').after([elem, creator]);
                expect(jQuery('.newBefore').length).toEqual(2);
            });

        });

        describe("inserts new content before", function () {

            it("adds content before each", function (expect) {
                $('section').before('<div class="newBefore">');
                expect(jQuery('section').prev()).toMatchElements('.newBefore');
            });

            it("takes multiple args", function (expect) {
                $('section').before('<div class="newBefore">', '<a class="newBefore">', '<span class="newBefore">');
                expect(jQuery('.newBefore').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').before('foo').isDollar).toBe(true);
            });
        });

    });

})();
