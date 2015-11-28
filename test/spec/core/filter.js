(function () {
    describe('$fn - CORE', function () {

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
                        var testFn = function (i) {
                            return i % 2;
                        };

                        var dollarNodesFound = $('li').filter(testFn).get(),
                            jQueryNodesFound = jQuery('li').filter(testFn).get();

                        expect(dollarNodesFound).toEqual(jQueryNodesFound);
                    });

                    describe('params passed to callback', function () {

                        var sel = 'ul',
                            counter = 0;

                        var testTheParams = function (index, node) {
                            var _this = this;

                            it('loops each node in the selection', function () {
                                expect(counter).toEqual(index);
                                counter++;
                            });

                            it('sets "this" to the currently evaluated node', function () {
                                expect(_this).toEqual(node);
                            });

                            it('sets first param to the currently evaluated nodes index', function () {
                                expect($(sel)[index]).toEqual(node);
                            });

                            it('sets second param to the node', function () {
                                expect(node).toEqual($(sel)[index]);
                            });
                        };

                        $(sel).filter(testTheParams);
                    });
                });
            });
        });
    });
}());