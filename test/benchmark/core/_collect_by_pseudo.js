
var benchmark = module.parent.benchmark;

benchmark.add('Dollar', function() {
    $('button:disabled');
    $('button:hidden');
    $('li:odd');
    $('a:contains("HYPER")');
    $('li:has(#nested)');
    $('div:not(input)');
    $(':not(section, span, .container, .sel-empty, #multiple1, #multiple2, #notASelector, .sel_multiple)');
    $(':not(section, span, .container, .sel-empty, #multiple1, #multiple2, #notASelector, .sel_multiple) > div');
});

benchmark.add('jQuery', function() {
    jQuery('button:disabled');
    jQuery('button:hidden');
    jQuery('li:odd');
    jQuery('a:contains("HYPER")');
    jQuery('li:has(#nested)');
    jQuery('div:not(input)');
    jQuery(':not(section, span, .container, .sel-empty, #multiple1, #multiple2, #notASelector, .sel_multiple)');
    jQuery(':not(section, span, .container, .sel-empty, #multiple1, #multiple2, #notASelector, .sel_multiple) > div');
});
