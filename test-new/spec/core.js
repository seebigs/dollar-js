(function () {
    describe('$fn - core', function () {
        describe('mimics jQuery', function () {
            describe('FIND ----------------', function () {
                describe('with param types', function () {
                    describe('string', function () {

                        jQuery.each(SPEC.selectors.nestedMatches, function (i, selArr) {

                            it('in ' + selArr[0] + ' finds ' + selArr[1], function () {
                                var dollarNodesFound = $(selArr[0]).find(selArr[1]).get(),
                                    jQueryNodesFound = jQuery(selArr[0]).find(selArr[1]).get();

                                expect(dollarNodesFound).toEqual(jQueryNodesFound);
                            });
                        });
                    });

                    describe('node', function () {

                        jQuery.each(SPEC.selectors.nestedMatches, function (i, selArr) {

                            it('in ' + selArr[0] + ' finds ' + selArr[1], function () {
                                var dollarNodesFound = $(selArr[0]).find($(selArr[1])[0]).get(),
                                    jQueryNodesFound = jQuery(selArr[0]).find(jQuery(selArr[1])[0]).get();

                                expect(dollarNodesFound).toEqual(jQueryNodesFound);
                            });
                        });
                    });

                    describe('selection', function () {

                        jQuery.each(SPEC.selectors.nestedMatches, function (i, selArr) {

                            it('in ' + selArr[0] + ' finds ' + selArr[1], function () {
                                var dollarNodesFound = $(selArr[0]).find($(selArr[1])).get(),
                                    jQueryNodesFound = jQuery(selArr[0]).find($(selArr[1])).get();

                                expect(dollarNodesFound).toEqual(jQueryNodesFound);
                            });
                        });
                    });
                });
            });

            describe('CLOSEST --------------', function () {
                describe('without context', function () {
                    describe('with param types', function () {

                        describe('string', function () {

                            jQuery.each(SPEC.selectors.nestedMatches, function (i, selArr) {

                                it('from ' + selArr[1] + ' finds ' + selArr[0], function () {
                                    var dollarNodesFound = $(selArr[1]).closest(selArr[0]).get(),
                                        jQueryNodesFound = jQuery(selArr[1]).closest(selArr[0]).get();

                                    expect(dollarNodesFound).toEqual(jQueryNodesFound);
                                });
                            });
                        });

                        describe('node', function () {

                            jQuery.each(SPEC.selectors.nestedMatches, function (i, selArr) {

                                it('from ' + selArr[1] + ' finds ' + selArr[0], function () {
                                    var dollarNodesFound = $(selArr[1]).closest($(selArr[0])[0]).get(),
                                        jQueryNodesFound = jQuery(selArr[1]).closest(jQuery(selArr[0])[0]).get();

                                    expect(dollarNodesFound).toEqual(jQueryNodesFound);
                                });
                            });
                        });

                        describe('selection', function () {

                            jQuery.each(SPEC.selectors.nestedMatches, function (i, selArr) {

                                it('from ' + selArr[1] + ' finds ' + selArr[0], function () {
                                    var dollarNodesFound = $(selArr[1]).find($(selArr[0])).get(),
                                        jQueryNodesFound = jQuery(selArr[1]).find($(selArr[0])).get();

                                    expect(dollarNodesFound).toEqual(jQueryNodesFound);
                                });
                            });
                        });
                    });
                });

                describe('with context', function () {
                    describe('with param types', function () {

                        describe('string', function () {

                            it('from #nested finds .list within .nested-list-container', function () {
                                var dollarNodesFound = $('#nested').closest('.list', '.nested-list-container').get(),
                                    jQueryNodesFound = jQuery('#nested').closest('.list', '.nested-list-container').get();

                                expect(dollarNodesFound).toEqual(jQueryNodesFound);
                            });
                        });


                        describe('selection', function () {

                            it('from #nested finds .list within .nested-list-container', function () {
                                var dollarNodesFound = $('#nested').closest('.list', $('.nested-list-container')).get(),
                                    jQueryNodesFound = jQuery('#nested').closest('.list', jQuery('.nested-list-container')).get();

                                expect(dollarNodesFound).toEqual(jQueryNodesFound);
                            });
                        });

                        describe('node', function () {

                            it('from #nested finds .list within .nested-list-container', function () {
                                var dollarNodesFound = $('#nested').closest('.list', $('.nested-list-container')[0]).get(),
                                    jQueryNodesFound = jQuery('#nested').closest('.list', jQuery('.nested-list-container')[0]).get();

                                expect(dollarNodesFound).toEqual(jQueryNodesFound);
                            });
                        });
                    });
                });
            });

            describe('FILTER ---------------', function () {

                describe('with param types', function () {

                    describe('string', function () {

                        it('winnows li to .list-item', function () {
                            var dollarNodesFound = $('li').filter('.list-item').get(),
                                jQueryNodesFound = jQuery('li').filter('.list-item').get();

                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });
                    });

                    describe('node', function () {

                        it('winnows li to .list-item', function () {
                            var dollarNodesFound = $('li').filter($('.list-item')[0]).get(),
                                jQueryNodesFound = jQuery('li').filter(jQuery('.list-item')[0]).get();

                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });
                    });

                    describe('selection', function () {

                        it('winnows li to .list-item', function () {
                            var dollarNodesFound = $('li').filter($('.list-item')).get(),
                                jQueryNodesFound = jQuery('li').filter(jQuery('.list-item')).get();

                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });
                    });

                    describe('function', function () {

                        it('winnows li to evens', function () {
                            var testFn = function (i, n) {
                                return i % 2;
                            };

                            var dollarNodesFound = $('li').filter(testFn).get(),
                                jQueryNodesFound = jQuery('li').filter(testFn).get();

                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });
                    });
                });
            });

            describe('EQ -------------------', function () {

                describe('with param types', function () {

                    describe('positive numbers', function () {
                        var i = 0,
                            len = $('li').length + 1;

                        for (; i < len; i++) {
                            it('gets a single selection', function () {
                                expect($('li').eq(i).get()).toEqual(jQuery('li').eq(i).get());
                            });
                        }
                    });

                    describe('negative numbers', function () {
                        var i = $('li').length + 1,
                            start = 0;

                        for (; i >= start; i--) {
                            it('gets a single selection', function () {
                                expect($('li').eq(i).get()).toEqual(jQuery('li').eq(i).get());
                            });
                        }
                    });

                    describe('positive stringified number', function () {
                        var i = 0,
                            len = $('li').length + 1;

                        for (; i < len; i++) {
                            it('gets a single selection', function () {
                                expect($('li').eq(i + '').get()).toEqual(jQuery('li').eq(i + '').get());
                            });
                        }
                    });

                    describe('negative stringified number', function () {
                        var i = $('li').length + 1,
                            start = 0;

                        for (; i >= start; i--) {
                            it('gets a single selection', function () {
                                expect($('li').eq(i + '').get()).toEqual(jQuery('li').eq(i + '').get());
                            });
                        }
                    });
                });
            });
        });
    });
})();