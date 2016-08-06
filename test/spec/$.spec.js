(function () {

    describe("$DOLLAR", function () {

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            it("handles no selector (ignored)", function () {
                expect(emptyDollar.length).toBe(0);
                expect(emptyDollar.get()).toEqual([]);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector (ignored)", function () {
                    expect($(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function () {
                expect($($('a'))).toEqual($('a'));
            });

            it("handles HTML string as selector (creates nodes)", function () {
                // jQuery includes linebreaks as text nodes when passing HTML strings
                // not sure if we want to do this. kind of seems unnecessary? especially
                // since textNodes can't be jQueried...

                var created = $('<div class="created"><p></p></div>')[0];
                expect(created.nodeName).toEqual('DIV');
                expect(created.className).toEqual('created');
                expect(created.childNodes[0].nodeName).toEqual('P');
            });

            it("handles Window as selector", function () {
                expect($(window)[0]).toEqual(window);
            });

            it("handles Node as selector", function () {
                expect($(document)[0]).toEqual(document);
            });

            it("handles NodeList as selector", function () {
                expect($(document.body.childNodes)[0]).toEqual(document.body.childNodes[0]);
            });

            it("handles Element as selector", function () {
                var elem = document.getElementById('slim_shady');
                expect($(elem)[0]).toEqual(elem);
            });

            it("handles Array of Elements as selector", function () {
                var elem = document.getElementById('slim_shady');
                expect($([elem, elem, elem])[0]).toEqual(elem);
            });

            it("handles function as selector (invokes when documentReady)", function () {
                // really hard to test DOMContentLoaded event here
                var docReadySoExecNow = false;
                $(function () {
                    docReadySoExecNow = true;
                });
                expect(docReadySoExecNow).toBe(true);
            });

        });

        describe("avoids accidental matches", function () {
            jQuery.each(SELECTORS.nomatch, function (i, sel) {
                it("does not match '" + sel + "'", function () {
                    expect($(sel).length).toBe(0);
                });
            });
        });

        describe("mimics jQuery", function () {
            jQuery.each(SELECTORS.matchJQuery, function (sel) {
                it("matches '" + sel + "'", function () {
                    expect($(sel)).toMatchElements(jQuery(sel));
                });
            });
        });

        describe("matches our DOM", function () {
            jQuery.each(SELECTORS.matchJQuery, function (sel, match) {
                it("matches '" + sel + "'", function () {
                    expect($(sel)).toMatchElements(match);
                });
            });
        });

        describe("matches within context", function () {

            var contextSelector = SELECTORS.contextSelector;

            jQuery.each(SELECTORS.context, function (context, match) {
                it("within '" + context + "'", function () {
                    expect($(contextSelector, context)).toMatchElements(match);
                });
            });

            it("within window", function () {
                expect($(contextSelector, window)).toMatchElements(contextSelector);
            });

            it("within document", function () {
                expect($(contextSelector, document)).toMatchElements(contextSelector);
            });

            it("within an Element", function () {
                var elem = document.getElementById('top_list');
                expect($(contextSelector, elem)).toMatchElements(jQuery(contextSelector, elem));
            });

            it("within an Array", function () {
                expect($(contextSelector, [1,2,3])).toMatchElements($(contextSelector));
                expect($(contextSelector, $('section').get())).toMatchElements(jQuery(contextSelector, jQuery('section').get()));
            });

            it("within an Object", function () {
                expect($(contextSelector, { abc: 123 })).toMatchElements($(contextSelector));
            });

            it("within a dollar instance", function () {
                expect($(contextSelector, $('section'))).toMatchElements(jQuery(contextSelector, jQuery('section')));
            });

        });

        describe("has a length property", function () {

            it("with zero items", function () {
                expect($().length).toBe(0);
            });

            it("with one item", function () {
                expect($('#slim_shady').length).toBe(1);
            });

            it("with many items", function () {
                expect($('p').length > 1).toBe(true);
            });

        });

        describe("can get using array notation", function () {

            it("return one item", function () {
                expect($('p')[2].nodeName).toBe('P');
            });

        });

        describe("can get using .get()", function () {

            it("return one item", function () {
                expect($('p').get(2).nodeName).toBe('P');
            });

            it("return all items", function () {
                var all = $('p').get();
                expect(Array.isArray(all)).toBe(true);
                expect(all.length).not.toBe(0);
            });

        });

    });

})();
