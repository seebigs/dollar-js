(function () {

    describe("$DOLLAR", function () {

        describe("handles all types of selectors", function () {

            var emptyDollar = $();

            it("handles no selector (ignored)", function (expect) {
                expect(emptyDollar.length).toBe(0);
                expect(emptyDollar.get()).toEqual([]);
            });

            jQuery.each(SELECTORS.ignored, function (name, sel) {
                it("handles " + name + " as selector (ignored)", function (expect) {
                    expect($(sel)).toEqual(emptyDollar);
                });
            });

            it("handles dollar instance as selector", function (expect) {
                expect($($('a'))).toEqual($('a'));
            });

            it("handles HTMLString as selector (creates nodes)", function (expect) {
                // jQuery includes linebreaks as text nodes when passing HTMLStrings
                // not sure if we want to do this. kind of seems unnecessary? especially
                // since textNodes can't be jQueried...

                var created = $('<div class="created"><p></p></div>')[0];
                expect(created.nodeName).toEqual('DIV');
                expect(created.className).toEqual('created');
                expect(created.childNodes[0].nodeName).toEqual('P');
            });

            it("handles Window as selector", function (expect) {
                expect($(window)[0]).toEqual(window);
            });

            it("handles Node as selector", function (expect) {
                expect($(document)[0]).toEqual(document);
            });

            it("handles NodeList as selector", function (expect) {
                expect($(document.body.childNodes)[0]).toEqual(document.body.childNodes[0]);
            });

            it("handles Element as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($(elem)[0]).toEqual(elem);
            });

            it("handles Array of Elements as selector", function (expect) {
                var elem = document.getElementById('slim_shady');
                expect($([elem, elem, elem])[0]).toEqual(elem);
            });

            it("handles function as selector (invokes when documentReady)", function (expect, done) {
                $(function () {
                    expect(true).toBe(true);
                    done();
                });
            });

            it('always returns an instance of Dollar', function () {
                jQuery.each(SELECTORS.ignored, function (name, sel) {
                    it('returns an instance of $dollar', function (expect) {
                        expect($(sel).isDollar).toBe(true);
                    });
                });
                jQuery.each(SELECTORS.nomatch, function (i, sel) {
                    it('returns an instance of $dollar', function (expect) {
                        expect($(sel).isDollar).toBe(true);
                    });
                });
                jQuery.each(SELECTORS.matchJQueryAndDom, function (sel) {
                    it('returns an instance of $dollar', function (expect) {
                        expect($(sel).isDollar).toBe(true);
                    });
                });
                jQuery.each(SELECTORS.matchDom, function (sel) {
                    it('returns an instance of $dollar', function (expect) {
                        expect($(sel).isDollar).toBe(true);
                    });
                });
            });
        });

        describe("avoids unsupported methods", function () {
            it("getElementsByClassName is not supported", function (expect) {
                var fauxElement = {
                    nodeType: 1,
                    querySelectorAll: function () {
                        return [];
                    },
                };
                expect($('.foo', fauxElement)).toEqual($());
            });
        });

        describe("avoids accidental matches", function () {
            jQuery.each(SELECTORS.nomatch, function (i, sel) {
                it("does not match '" + sel + "'", function (expect) {
                    expect($(sel).length).toBe(0);
                });
            });
        });

        describe("mimics jQuery", function () {
            jQuery.each(SELECTORS.matchJQueryAndDom, function (sel) {
                it("matches '" + sel + "'", function (expect) {
                    expect($(sel)).toMatchElements(jQuery(sel));
                });
            });
        });

        describe("matches our DOM", function () {
            jQuery.each(SELECTORS.matchJQueryAndDom, function (sel, match) {
                if (sel && match) {
                    it("matches '" + sel + "'", function (expect) {
                        expect($(sel)).toMatchElements(match);
                    });
                }
            });
            jQuery.each(SELECTORS.matchDom, function (sel, match) {
                it("matches '" + sel + "'", function (expect) {
                    expect($(sel)).toMatchElements(match);
                });
            });
        });

        describe("matches within context", function () {

            var contextSelector = SELECTORS.contextSelector;

            jQuery.each(SELECTORS.context, function (context, match) {
                it("within '" + context + "'", function (expect) {
                    expect($(contextSelector, context)).toMatchElements(match);
                });
            });

            it("within window", function (expect) {
                expect($(contextSelector, window)).toMatchElements(contextSelector);
            });

            it("within document", function (expect) {
                expect($(contextSelector, document)).toMatchElements(contextSelector);
            });

            it("within an Element", function (expect) {
                var elem = document.getElementById('top_list');
                expect($(contextSelector, elem)).toMatchElements(jQuery(contextSelector, elem));
            });

            it("within an Array", function (expect) {
                expect($(contextSelector, [1,2,3])).toMatchElements($(contextSelector));
                expect($(contextSelector, $('section').get())).toMatchElements(jQuery(contextSelector, jQuery('section').get()));
            });

            it("within an Object", function (expect) {
                expect($(contextSelector, { abc: 123 })).toMatchElements($(contextSelector));
            });

            it("within a dollar instance", function (expect) {
                expect($(contextSelector, $('section'))).toMatchElements(jQuery(contextSelector, jQuery('section')));
            });

            it('within an empty dollar instance', function(expect) {
                expect($(contextSelector, $())).toMatchElements(jQuery(contextSelector, jQuery()));
            });

        });

        describe("has a length property", function () {

            it("with zero items", function (expect) {
                expect($().length).toBe(0);
            });

            it("with one item", function (expect) {
                expect($('#slim_shady').length).toBe(1);
            });

            it("with many items", function (expect) {
                expect($('p').length > 1).toBe(true);
            });

        });

        describe("has forEach method", function () {

            it("iterates over the set", function (expect) {
                var times = 0;
                $('section').each(function () { times++; });
                expect(times).toBe(3);
            });

        });

        describe("can get using array notation", function () {

            it("return one item", function (expect) {
                expect($('p')[2].nodeName).toBe('P');
            });

        });

        describe("can get using .get()", function () {

            it("return one item", function (expect) {
                expect($('p').get(2).nodeName).toBe('P');
            });

            it("return all items", function (expect) {
                var all = $('p').get();
                expect(Array.isArray(all)).toBe(true);
                expect(all.length).not.toBe(0);
            });

        });

    });

})();
