(function () {
    describe('$fn - CORE', function () {

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
    });
}());