/**
 * Inject mock_dom.html into test context
 */

jQuery.ajax({
    url: '/base/mock_dom.html',
    success: function (data) {
        document.body.innerHTML = data;
    },
    dataType: 'html',
    async: false
});
