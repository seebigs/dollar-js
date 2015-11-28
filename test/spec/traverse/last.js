(function () {

    describe('TRAVERSE', function () {

        describe('LAST', function () {
            describe('LAST -----------------', function () {
                describe('it mimics jQuery', function () {
                    it('gets the last element in a selection', function () {
                        expect($('div').last().get()).toEqual(jQuery('div').last().get());
                    });
                });
            });
        });
    });
}());