(function () {
    describe('has', function () {
        it('returns an empty dollar collection when passed no params', function () {
            sharedExpectations.noParamsPassedForFn('has');
        });

        describe('when passed params', function () {
            sharedExpectations.compareCollectionForFn('has', ['string', 'dollar']);
        });
    });
})();