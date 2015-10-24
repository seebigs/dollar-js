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

                        it('from .list returns full selection with .fake ([] empty selection)', function () {
                            expect($('.list').parent('.fake').get()).toEqual(jQuery('.list').parent('.fake').get());
                        });
                    });
                });
            });

            describe('matches jQuery filter', function () {
                describe('with param types', function () {

                    describe('node', function () {
                        var dollarNodesFound = $('.list').parent($('.nested-list-container')[0]).get(),
                            jQueryNodesFound = jQuery('.list').parent().filter(jQuery('.nested-list-container')[0]).get();

                        it('from .list finds elements with .nested-list-container', function () {
                            expect(dollarNodesFound).toEqual(jQueryNodesFound);
                        });

                        it('from .list returns empty selection with .fake', function () {
                            expect($('.list').parent($('.fake')[0]).get()).toEqual(jQuery('.list').parent().filter(jQuery('.fake')[0]).get());
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

                        it('from .list finds elements', function () {
                            var testFn = function (i) {
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
                                var _this = this;

                                it('sets "this" to the currently evaluated node', function () {
                                    expect(_this).toEqual(node);
                                });

                                it('passes the index as the first parameter', function () {
                                    expect(counter).toEqual(index);
                                    counter++;
                                });

                                it('passes the node as the second parameter', function () {
                                    expect(node).toEqual($(sel).parent()[index]);
                                });
                            };

                            $(sel).parent(testTheParams);
                        });
                    });
                });
            });
        });

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

            describe('FIRST ----------------', function () {
                describe('it mimics jQuery', function () {
                    it('gets the first element in a selection', function () {
                        expect($('div').first().get()).toEqual(jQuery('div').first().get());
                    });
                });
            });


            describe('LAST -----------------', function () {
                describe('it mimics jQuery', function () {
                    it('gets the last element in a selection', function () {
                        expect($('div').last().get()).toEqual(jQuery('div').last().get());
                    });
                });
            });

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
    });
})();
