(function () {

    var clicked = false;

    function testCallback (e) {
        e.preventDefault();
        return clicked = true;
    }

    describe('on', function () {
        it('executes a callback bound to an element on click', function () {
            
            jQuery('button').on('click', testCallback);
            
            jQuery('button').click(); // we don't yet support triggers
            expect(clicked).toBe(true);
        });
    });


    // run this in isolation occasionally
    // when run with other tests, it will
    // refresh the browser and throw a karma
    // error
    
    
    // describe('off', function () {
    //     it('removes the callback bound to an element', function () {
            
    //         jQuery('button').off('click', testCallback);

    //         clicked = false;
    //         jQuery('button').click();
    //         expect(clicked).toBe(false);
    //     });
    // });
})();
