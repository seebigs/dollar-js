(function () {
    describe('closest', function () {
        it('returns an empty dollar collection when passed no params', function () {
            sharedExpectations.noParamsPassedForFn('closest');
        });

        describe('when passed params', function () {
            sharedExpectations.compareCollectionForFn('closest', ['string', 'node', 'dollar']);
        });
    });
})();