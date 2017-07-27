(function () {

    describe(".find", function () {

        var $b = $(document.getElementsByTagName('body')[0]);

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            it("handles no selector", function (expect) {
                expect($b.find()).toEqual(emptyDollar);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector", function (expect) {
                    expect($b.find(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($b.find($('a')).get()).toEqual($('a').get());
            });

            describe('finding within parent found with string selector', function () {

                it('searches within a string parent for string child', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(parent).find(children);
                    var jQueryFound = jQuery(parent).find(children);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a string parent for $children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(parent).find($(children));
                    var jQueryFound = jQuery(parent).find(jQuery(children));

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a string parent for single node child', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(parent).find(document.getElementsByClassName(children)[0]);
                    var jQueryFound = jQuery(parent).find(document.getElementsByClassName(children)[0]);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a string parent for many node children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(parent).find(document.getElementsByClassName(children));
                    var jQueryFound = jQuery(parent).find(document.getElementsByClassName(children));

                    expect($found).toMatchElements(jQueryFound);
                });
            });

            describe('finding within a parent found with $', function () {

                it('searches within a $parent for string children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $($(parent)).find(children);
                    var jQueryFound = jQuery(jQuery(parent)).find(children);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a $parent for $children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $($(parent)).find($(children));
                    var jQueryFound = jQuery(jQuery(parent)).find(jQuery(children));

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a $parent for single node child', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $($(parent)).find(document.getElementsByClassName(children)[0]);
                    var jQueryFound = jQuery(jQuery(parent)).find(document.getElementsByClassName(children)[0]);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a $parent for multiple node children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $($(parent)).find(document.getElementsByClassName(children));
                    var jQueryFound = jQuery(jQuery(parent)).find(document.getElementsByClassName(children));

                    expect($found).toMatchElements(jQueryFound);
                });
            });

            describe('finding within a single parent node', function () {

                it('searches within a single node parent for string children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(document.getElementById(parent)).find(children);
                    var jQueryFound = jQuery(document.getElementById(parent)).find(children);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a single node parent for $children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(document.getElementById(parent)).find($(children));
                    var jQueryFound = jQuery(document.getElementById(parent)).find(jQuery(children));

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a single node parent for single node child', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(document.getElementById(parent)).find(document.getElementsByClassName(children)[0]);
                    var jQueryFound = jQuery(document.getElementById(parent)).find(document.getElementsByClassName(children)[0]);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within a single node parent for multiple node children', function (expect) {

                    var parent = '#first_section';
                    var children = '.find_me';

                    var $found = $(document.getElementById(parent)).find(document.getElementsByClassName(children));
                    var jQueryFound = jQuery(document.getElementById(parent)).find(document.getElementsByClassName(children));

                    expect($found).toMatchElements(jQueryFound);
                });
            });

            describe('finding within multiple node parents', function () {

                it('searches within multiple node parents for string children', function (expect) {

                    var parent = 'section';
                    var children = '.find_me';

                    var $found = $(document.getElementsByTagName(parent)).find(children);
                    var jQueryFound = jQuery(document.getElementsByTagName(parent)).find(children);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within multiple node parents for $children', function (expect) {

                    var parent = 'section';
                    var children = '.find_me';

                    var $found = $(document.getElementsByTagName(parent)).find($(children));
                    var jQueryFound = jQuery(document.getElementsByTagName(parent)).find(jQuery(children));

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within multiple node parents for a single node child', function (expect) {

                    var parent = 'section';
                    var children = '.find_me';

                    var $found = $(document.getElementsByTagName(parent)).find(document.getElementsByClassName(children)[0]);
                    var jQueryFound = jQuery(document.getElementsByTagName(parent)).find(document.getElementsByClassName(children)[0]);

                    expect($found).toMatchElements(jQueryFound);
                });

                it('searches within multiple node parents for multiple node children', function (expect) {

                    var parent = 'section';
                    var children = '.find_me';

                    var $found = $(document.getElementsByTagName(parent)).find(document.getElementsByClassName(children));
                    var jQueryFound = jQuery(document.getElementsByTagName(parent)).find(document.getElementsByClassName(children));

                    expect($found).toMatchElements(jQueryFound);
                });
            });
        });

        describe("only finds children", function () {

            it("matches children", function (expect) {
                expect($('#top_list').find(SELECTORS.contextSelector)).toMatchElements('.sel-in-context-id');
            });

        });

        describe("avoids accidental matches", function () {
            jQuery.each(SELECTORS.nomatch, function (i, sel) {
                it("does not match '" + sel + "'", function (expect) {
                    expect($b.find(sel).length).toBe(0);
                });
            });
        });

        describe("matches our DOM", function () {
            jQuery.each(SELECTORS.matchJQuery, function (sel, match) {
                it("matches '" + sel + "'", function (expect) {
                    expect($b.find(sel)).toMatchElements(match);
                });
            });
        });

        describe("is chainable", function () {
            it("returns dollar instance", function (expect) {
                expect($b.find('foo').isDollar).toBe(true);
            });
        });

    });

})();
