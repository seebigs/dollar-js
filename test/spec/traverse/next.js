(function () {

    describe('TRAVERSE', function () {

        describe('NEXT -----------------', function () {
            describe('mimics jQuery', function () {
                describe('with param types', function () {

                    describe('none', function () {
                        var dollarNodesFound = $('div').next().get(),
                            jQueryNodesFound = jQuery('div').next().get();

                        it('from div finds elements', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from elem w no next returns empty selection', function () {
                            expect($('html').next().get()).toEqual(jQuery('html').next().get());
                        });
                    });

                    describe('string', function () {
                        var dollarNodesFound = $('div').next('button').get(),
                            jQueryNodesFound = jQuery('div').next('button').get();

                        it('from div finds elements', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from div returns empty selection with .fake', function () {
                            expect($('div').next('.fake').get()).toEqual(jQuery('div').next('.fake').get());
                        });
                    });
                });
            });

            describe('matches jQuery filter', function () {
                describe('with param types', function () {

                    describe('node', function () {
                        var dollarNodesFound = $('div').next($('div')[0]).get(),
                            jQueryNodesFound = jQuery('div').next().filter(jQuery('div')[0]).get();

                        it('from div finds elements with .nested-list-container', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from div returns empty selection with .fake', function () {
                            expect($('div').next($('.fake')[0]).get()).toEqual(jQuery('div').next().filter(jQuery('.fake')[0]).get());
                        });
                    });

                    describe('selection', function () {
                        var dollarNodesFound = $('div').next($('div')).get(),
                            jQueryNodesFound = jQuery('div').next().filter(jQuery('div')).get();

                        it('from div finds elements with .nested-list-container', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from div returns empty selection with .fake', function () {
                            expect($('div').next($('.fake')).get()).toEqual(jQuery('div').next().filter(jQuery('.fake')).get());
                        });
                    });

                    describe('function', function () {

                        it('from div finds elements', function () {
                            var testFn = function (i) {
                                return i % 2;
                            };

                            var dollarNodesFound = $('div').next(testFn).get(),
                                jQueryNodesFound = jQuery('div').next().filter(testFn).get();

                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        describe('params passed to callback', function () {

                            var sel = 'div',
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
                                    expect(node).toEqual($(sel).next()[index]);
                                });
                            };

                            $(sel).next(testTheParams);
                        });
                    });
                });
            });
        });
    });
}());