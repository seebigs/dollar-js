(function () {
    describe('children', function () {
        describe('when passed params', function () {
            // another example where we support something different than jQuery
            sharedExpectations.compareCollectionForFn('children', ['string', /* 'dollar' */]);
        });
    });
})();