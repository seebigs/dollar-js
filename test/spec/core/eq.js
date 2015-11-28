(function () {
    describe('$fn - CORE', function () {

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
                            expect($('li').eq(String(i)).get()).toEqual(jQuery('li').eq(String(i)).get());
                        });
                    }
                });

                describe('negative stringified number', function () {
                    var i = $('li').length + 1,
                        start = 0;

                    for (; i >= start; i--) {
                        it('gets a single selection', function () {
                            expect($('li').eq(String(i)).get()).toEqual(jQuery('li').eq(String(i)).get());
                        });
                    }
                });
            });
        });
    });
}());