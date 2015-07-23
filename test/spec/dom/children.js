(function () {
    describe('children', function () {
        it('returns an empty dollar collection when passed no params', function () {
            sharedExpectations.noParamsPassedForFn('children');
        });

        describe('when passed params', function () {
            sharedExpectations.compareCollectionForFn('children', ['string', 'dollar']);
        });
    });
})();