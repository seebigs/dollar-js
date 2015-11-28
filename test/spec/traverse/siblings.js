(function () {
    
    describe('TRAVERSE', function () {

        describe('SIBLINGS -------------', function () {
            describe('mimics jQuery', function () {
                describe('with param types', function () {

                    describe('none', function () {
                        var dollarNodesFound = $('#multiple1').siblings().get(),
                            jQueryNodesFound = jQuery('#multiple1').siblings().get();

                        it('from #multiple1 finds elements', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from elem w no siblings returns empty selection', function () {
                            expect($('html').siblings().get()).toEqual(jQuery('html').siblings().get());
                        });
                    });

                    describe('string', function () {
                        var dollarNodesFound = $('#multiple1').siblings('button').get(),
                            jQueryNodesFound = jQuery('#multiple1').siblings('button').get();

                        it('from #multiple1 finds elements', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from #multiple1 returns empty selection with .fake', function () {
                            expect($('#multiple1').siblings('.fake').get()).toEqual(jQuery('#multiple1').siblings('.fake').get());
                        });
                    });
                });
            });

            describe('matches jQuery filter', function () {
                describe('with param types', function () {

                    describe('node', function () {
                        var dollarNodesFound = $('#multiple1').siblings($('.inner-list')[0]).get(),
                            jQueryNodesFound = jQuery('#multiple1').siblings().filter(jQuery('.inner-list')[0]).get();

                        it('from #multiple1 finds elements with .nested-list-container', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from #multiple1 returns empty selection with .fake', function () {
                            expect($('#multiple1').siblings($('.fake')[0]).get()).toEqual(jQuery('#multiple1').siblings().filter(jQuery('.fake')[0]).get());
                        });
                    });

                    describe('selection', function () {
                        var dollarNodesFound = $('#multiple1').siblings($('.inner-list')).get(),
                            jQueryNodesFound = jQuery('#multiple1').siblings().filter(jQuery('.inner-list')).get();

                        it('from #multiple1 finds elements with .nested-list-container', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from #multiple1 returns empty selection with .fake', function () {
                            expect($('#multiple1').siblings($('.fake')).get()).toEqual(jQuery('#multiple1').siblings().filter(jQuery('.fake')).get());
                        });
                    });

                    describe('function', function () {

                        it('from #multiple1 finds elements', function () {
                            var testFn = function (i) {
                                return i % 2;
                            };

                            var dollarNodesFound = $('#multiple1').siblings(testFn).get(),
                                jQueryNodesFound = jQuery('#multiple1').siblings().filter(testFn).get();

                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        describe('params passed to callback', function () {

                            var sel = '#multiple1',
                                counter = 0;

                            var testTheParams = function (index, node) {
                                var _this = this;

                                it('sets "this" to the currently evaluated node', function () {
                                    expect(_this).toEqual(node);
                                });

                                it('passes the index as the first parameter', function () {
                                    expect(counter).toEqual(index);
                                    counter++;
                                });

                                it('passes the node as the second parameter', function () {
                                    expect(node).toEqual($(sel).siblings()[index]);
                                });
                            };

                            $(sel).siblings(testTheParams);
                        });
                    });
                });
            });
        });

    });
}());