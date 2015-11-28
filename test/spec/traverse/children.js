(function () {

    describe('TRAVERSE', function () {

        describe('CHIDLREN -------------', function () {
            describe('mimics jQuery', function () {
                describe('with param types', function () {

                    describe('none', function () {
                        var dollarNodesFound = $('.list').children().get(),
                            jQueryNodesFound = jQuery('.list').children().get();

                        it('from .list finds elements', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from elem w no children returns empty selection', function () {
                            expect($('article li').children().get()).toEqual(jQuery('article li').children().get());
                        });
                    });

                    describe('string', function () {
                        var dollarNodesFound = $('.list').children('ul').get(),
                            jQueryNodesFound = jQuery('.list').children('ul').get();

                        it('from .list finds elements', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from .list returns empty selection with .fake', function () {
                            expect($('.list').children('.fake').get()).toEqual(jQuery('.list').children('.fake').get());
                        });
                    });
                });
            });

            describe('matches jQuery filter', function () {
                describe('with param types', function () {

                    describe('node', function () {
                        var dollarNodesFound = $('.list').children($('.inner-list')[0]).get(),
                            jQueryNodesFound = jQuery('.list').children().filter(jQuery('.inner-list')[0]).get();

                        it('from .list finds elements with .nested-list-container', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from .list returns empty selection with .fake', function () {
                            expect($('.list').children($('.fake')[0]).get()).toEqual(jQuery('.list').children().filter(jQuery('.fake')[0]).get());
                        });
                    });

                    describe('selection', function () {
                        var dollarNodesFound = $('.list').children($('.inner-list')).get(),
                            jQueryNodesFound = jQuery('.list').children().filter(jQuery('.inner-list')).get();

                        it('from .list finds elements with .nested-list-container', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from .list returns empty selection with .fake', function () {
                            expect($('.list').children($('.fake')).get()).toEqual(jQuery('.list').children().filter(jQuery('.fake')).get());
                        });
                    });

                    describe('function', function () {

                        it('from .list finds elements', function () {
                            var testFn = function (i) {
                                return i % 2;
                            };

                            var dollarNodesFound = $('.list').children(testFn).get(),
                                jQueryNodesFound = jQuery('.list').children().filter(testFn).get();

                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        describe('params passed to callback', function () {

                            var sel = '.list',
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
                                    expect(node).toEqual($(sel).children()[index]);
                                });
                            };

                            $(sel).children(testTheParams);
                        });
                    });
                });
            });
        });
    });
}());