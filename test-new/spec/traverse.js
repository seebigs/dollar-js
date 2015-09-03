(function () {
    describe('traverse', function () {

        describe('PARENT ---------------', function () {
            describe('mimics jQuery', function () {
                describe('with param types', function () {

                    describe('none', function () {
                        var dollarNodesFound = $('.list').parent().get(),
                            jQueryNodesFound = jQuery('.list').parent().get();

                        it('from .list finds elements', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from document returns empty selection', function () {
                            expect($(document).parent().get()).toEqual(jQuery(document).parent().get());
                        });
                    });

                    describe('string', function () {
                        var dollarNodesFound = $('.list').parent('.nested-list-container').get(),
                            jQueryNodesFound = jQuery('.list').parent('.nested-list-container').get();

                        it('from .list finds elements with .nested-list-container', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from .list returns empty selection with .fake', function () {
                            expect($('.list').parent('.fake').get()).toEqual(jQuery('.list').parent('.fake').get());
                        });
                    });
                });
            });

            describe('deviates from jQuery', function () {
                describe('with param types', function () {

                    describe('node', function () {
                        var dollarNodesFound = $('.list').parent($('.nested-list-container')[0]).get(),
                            jQueryNodesFound = jQuery('.list').parent().filter(jQuery('.nested-list-container')[0]).get();

                        it('from .list finds elements with .nested-list-container', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from .list returns empty selection with .fake', function () {
                            expect($('.list').parent($('.fake')[0]).get()).toEqual(jQuery('.list').parent(jQuery('.fake')[0]).get());
                        });
                    });

                    describe('selection', function () {
                        var dollarNodesFound = $('.list').parent($('.nested-list-container')).get(),
                            jQueryNodesFound = jQuery('.list').parent().filter(jQuery('.nested-list-container')).get();

                        it('from .list finds elements with .nested-list-container', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from .list returns empty selection with .fake', function () {
                            expect($('.list').parent($('.fake')).get()).toEqual(jQuery('.list').parent().filter(jQuery('.fake')).get());
                        });
                    });

                    describe('function', function () {

                        it('from .list finds elements with .nested-list-container', function () {
                            var testFn = function (i, n) {
                                return i % 2;
                            };

                            var dollarNodesFound = $('.list').parent(testFn).get(),
                                jQueryNodesFound = jQuery('.list').parent().filter(testFn).get();

                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        describe('params passed to callback', function () {

                            var sel = '.list',
                                counter = 0;

                            var testTheParams = function (index, node) {
                                var thisVal = this;

                                it('sets "this" to the currently evaluated node', function () {
                                    expect(thisVal).toEqual(node);
                                });

                                it('passes the index as the first parameter', function () {
                                    expect(counter).toEqual(index);
                                    counter++;
                                });

                                it('passes the node as the second parameter', function () {
                                    expect(node).toEqual($(sel)[index]);

                                    // this test breaking highlights that the passed index won't
                                    // always be consecutive like filter's index param since 
                                    // they're passed within a conditional
                                });
                            };

                            $(sel).parent(testTheParams);
                        });
                    });
                });
            });
        });
    });
})();