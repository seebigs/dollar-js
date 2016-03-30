(function () {

    describe(".before", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function () {
                $('.mutate').before();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SPEC.selectors.ignored, function (name, sel) {
                it("handles " + name + " as content", function () {
                    $('.mutate').before(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles Element as content", function () {
                var elem = document.createElement('div');
                elem.className = 'newBefore';
                $('#mutate').before(elem);
                expect(jQuery('.newBefore').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function () {
                $('#mutate').before($('<div class="newBefore">'));
                expect(jQuery('.newBefore').length).toBe(1);
            });

            it("handles function as content", function () {
                $('.mutate').before(function () {
                    return '<div class="newBefore"></div>';
                });
                expect(jQuery('.newBefore').length).toBe(3);
            });

        });

        describe("inserts new content before", function () {

            it("adds content before each", function () {
                $('section').before('<div class="newBefore">');
                expect(jQuery('section').prev()).toMatchElements('.newBefore');
            });

            it("takes multiple args", function () {
                $('section').before('<div class="newBefore">', '<a class="newBefore">', '<span class="newBefore">');
                expect(jQuery('.newBefore').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($('.wonka').before('foo').isDollar).toBe(true);
            });
        });

    });

})();
