(function () {
    describe('$fn - CORE', function () {

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
    });
}());