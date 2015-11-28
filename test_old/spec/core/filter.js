(function () {
    describe('filter', function () {
        it('returns an empty dollar collection when passed no params', function () {
            sharedExpectations.noParamsPassedForFn('filter');
        });

        describe('when passed params', function () {
            sharedExpectations.compareCollectionForFn('filter', ['string', 'dollar', 'function', 'node']);
        });
    });
})();