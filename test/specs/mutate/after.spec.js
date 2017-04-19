(function () {

    describe(".after", function () {

        describe("handles all types of contents", function () {

            it("handles no content", function (expect) {
                $('.mutate').after();
                expect(jQuery('div', '#mutate').length).toBe(3);
                expect(jQuery('span', '#mutate').length).toBe(3);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as content", function (expect) {
                    $('.mutate').after(sel);
                    expect(jQuery('div', '#mutate').length).toBe(3);
                    expect(jQuery('span', '#mutate').length).toBe(3);
                });
            });

            it("handles Element as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newAfter';
                $('#mutate').after(elem);
                expect(jQuery('.newAfter').get()).toEqual([elem]);
            });

            it("handles dollar instance as content", function (expect) {
                $('#mutate').after($('<div class="newAfter">'));
                expect(jQuery('.newAfter').length).toBe(1);
            });

            it("handles function as content", function (expect) {
                $('.mutate').after(function () {
                    return '<div class="newAfter"></div>';
                });
                expect(jQuery('.newAfter').length).toBe(3);
            });

            it("handles Array as content", function (expect) {
                var elem = document.createElement('div');
                elem.className = 'newAfter';
                var creator = function () {
                    return '<div class="newAfter"></div>';
                };
                $('#mutate').after([elem, creator]);
                expect(jQuery('.newAfter').length).toEqual(2);
            });

        });

        describe("inserts new content after", function () {

            it("adds content after each", function (expect) {
                $('section').after('<div class="newAfter">');
                expect(jQuery('section').next()).toMatchElements('.newAfter');
            });

            it("takes multiple args", function (expect) {
                $('section').after('<div class="newAfter">', '<a class="newAfter">', '<span class="newAfter">');
                expect(jQuery('.newAfter').length).toBe(9);
            });

        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($('.wonka').after('foo').isDollar).toBe(true);
            });
        });

    });

})();
