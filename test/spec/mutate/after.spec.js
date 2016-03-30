(function () {

    describe(".after", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function () {
                $('.mutate').after();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SPEC.selectors.ignored, function (name, sel) {
                it("handles " + name + " as content", function () {
                    $('.mutate').after(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles Element as content", function () {
                var elem = document.createElement('div');
                elem.className = 'newAfter';
                $('#mutate').after(elem);
                expect(jQuery('.newAfter').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function () {
                $('#mutate').after($('<div class="newAfter">'));
                expect(jQuery('.newAfter').length).toBe(1);
            });

            it("handles function as content", function () {
                $('.mutate').after(function () {
                    return '<div class="newAfter"></div>';
                });
                expect(jQuery('.newAfter').length).toBe(3);
            });

        });

        describe("inserts new content after", function () {

            it("adds content after each", function () {
                $('section').after('<div class="newAfter">');
                expect(jQuery('section').next()).toMatchElements('.newAfter');
            });

            it("takes multiple args", function () {
                $('section').after('<div class="newAfter">', '<a class="newAfter">', '<span class="newAfter">');
                expect(jQuery('.newAfter').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function () {
                expect($('.wonka').after('foo').isDollar).toBe(true);
            });
        });

    });

})();
