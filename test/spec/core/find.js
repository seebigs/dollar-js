(function () {
    describe('find', function () {
        it('returns an empty dollar collection when passed no params', function () {
            sharedExpectations.noParamsPassedForFn('find');
        });

        describe('when passed params', function () {
            sharedExpectations.compareCollectionForFn('find');
        });
    });
})();