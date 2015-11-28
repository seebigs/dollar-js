(function () {

    describe('TRAVERSE', function () {

        describe('FIRST ----------------', function () {
            describe('it mimics jQuery', function () {
                it('gets the first element in a selection', function () {
                    expect($('div').first().get()).toEqual(jQuery('div').first().get());
                });
            });
        });
    });
}());