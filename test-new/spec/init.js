var dollarInitInvoked = false;
var jQueryInitInvoked = false;

$(function () {
    dollarInitInvoked = true;
});

jQuery(function () {
    jQueryInitInvoked = true;
});

(function () {
    describe('init', function () {

        beforeEach(function () {
            jasmine.addMatchers(SPEC.customMatchers);
        });

        describe('mimics jQuery', function () {

            describe('with no context', function () {

                describe('with params', function () {

                    describe('string selectors', function () {
                        jQuery.each(SPEC.selectors.matchJQuery, function (sel) {
                            it('matches ' + sel, function () {
                                expect($(sel).get()).toEqual(jQuery(sel).get());
                            });
                        });
                    });

                    describe('node selection', function () {
                        jQuery.each(SPEC.selectors.matchJQuery, function (sel) {
                            it('matches ' + sel, function () {
                                expect($($(sel)).get()).toEqual(jQuery(jQuery(sel)).get());
                            });
                        });
                    });

                    describe('DOM node', function () {
                        jQuery.each(SPEC.selectors.matchJQuery, function (sel) {
                            it('matches ' + sel, function () {
                                expect($($(sel)[0]).get()).toEqual(jQuery(jQuery(sel)[0]).get());
                            });
                        });
                    });

                    describe('Array of DOM nodes', function () {
                        jQuery.each(SPEC.selectors.matchJQuery, function (sel) {
                            it('matches ' + sel, function () {
                                expect($($(sel).get()).get()).toEqual(jQuery(jQuery(sel).get()).get());
                            });
                        });
                    });

                    describe('HTML string', function () {

                        var samples = {
                            singleNode: '<div></div>',
                            multiNodes: '<div><p></p></div>',
                            complex: jQuery('*').html()
                        };

                        // jQuery includes linebreaks as text nodes when passing HTML strings
                        // not sure if we want to do this. kind of seems unnecessary? especially
                        // since textNodes can't be jQueried...

                        jQuery.each(samples, function (name, htmlString) {
                            it('matches ' + name, function () {
                                expect($(htmlString)[0].innerHTML).toEqual(jQuery(htmlString)[0].innerHTML);
                            });
                        });
                    });

                    describe('document ready fn', function () {
                        it('matches dom content loaded', function () {
                            expect(dollarInitInvoked).toBe(true);
                            expect(jQueryInitInvoked).toBe(true);
                            expect(dollarInitInvoked).toEqual(jQueryInitInvoked);
                        });
                    });

                });
            });

            describe('init in context', function () {

                describe('with param types', function () {

                    describe('string context', function () {

                        jQuery.each(SPEC.selectors.nestedMatches, function (i, selArr) {

                            it('matches ' + selArr[0] + ' in context ' + selArr[1], function () {
                                expect($(selArr[0], selArr[1]).get()).toEqual(jQuery(selArr[0], selArr[1]).get());
                            });
                        });
                    });

                    describe('node context', function () {

                        jQuery.each(SPEC.selectors.nestedMatches, function (i, selArr) {

                            it('matches ' + selArr[0] + ' in context ' + selArr[1], function () {
                                expect($(selArr[0], $(selArr[1])[0]).get()).toEqual(jQuery(selArr[0], jQuery(selArr[1])[0]).get());
                            });
                        });
                    });

                    describe('node array context', function () {

                        jQuery.each(SPEC.selectors.nestedMatches, function (i, selArr) {

                            it('matches ' + selArr[0] + ' in context ' + selArr[1], function () {
                                expect($(selArr[0], $(selArr[1]).get()).get()).toEqual(jQuery(selArr[0], $(selArr[1]).get()).get());
                            });
                        });
                    });

                    describe('selection context', function () {

                        jQuery.each(SPEC.selectors.nestedMatches, function (i, selArr) {

                            it('matches ' + selArr[0] + ' in context ' + selArr[1], function () {
                                expect($(selArr[0], $(selArr[1])).get()).toEqual(jQuery(selArr[0], jQuery(selArr[1])).get());
                            });
                        });
                    });
                });
            });
        });
    });
})();
