
SELECTORS = {

    ignored: {
        'undefined': void 0,
        'empty string': '',
        'null': null,
        'false': false,
        'true': true,
        'Number': 456,
        'Array': [1,2,3],
        'Object': { abc: 123 }
    },

    nomatch: [
        'bad',
        '#bad',
        '.bad',
        ' #bad',
        ' #bad '
    ],

    matchJQueryAndDom: {
        '#good': '.sel-good',
        ' #good': '.sel-good',
        ' #good ': '.sel-good',
        '#slim_shady': '.sel-id',
        'div#slim_shady': '.sel-id-node',
        '#slim_shady.willy': '.sel-id-class',
        '.willy': '.sel-class',
        'div.wonka': '.sel-class-node',
        '.willy.wonka': '.sel-class-dual',
        'a': '.sel-elem',
        'p span': '.sel-descendant',
        'p > span': '.sel-child',
        'li:first-child': '.sel-first-child',
        'li:last-child': '.sel-last-child',
        'li:nth-child(2)': '.sel-nth-2',
        'li:nth-child(3n)': '.sel-nth-3n',
        'li:nth-child(even)': '.sel-even',
        'p.prev + p': '.sel-prev-next',
        'p.prev ~ p': '.sel-prev-sibling',
        'span:empty': '.sel-empty',
        'h2[foo]': '.sel-attr',
        'h2[foo="bar"]': '.sel-attr-equals',
        'h3[foo*="bar"]': '.sel-attr-contains',
        'h4[foo|="bar"]': '.sel-attr-contains-prefix',
        'h4[foo~="bar"]': '.sel-attr-contains-word',
        'h4[foo^="bar"]': '.sel-attr-starts-with',
        'h4[foo$="bar"]': '.sel-attr-ends-with',
        'button:disabled': '.sel-disabled',
        // 'button:hidden': '.sel-hidden', // node-as-browser needs to fix this
        // 'button:visible': '.sel-visible', // node-as-browser needs to fix this
        'a:contains("HYPER")': '.sel-elem',
        'input:checked': '.sel-checked',
        '#multiple1, #multiple2': '.sel-multiple',
        'li:has(#nested)': '.has-nested',

        '#pseudo_sel_not :not(div.inner, div.target) + input': '#pseudo_sel_not input',
        '#pseudo_sel_not :not(.datepicker *) > .click_tracking_target_two': false,
        '#pseudo_sel_not :not(.datepicker *) > .click_tracking_target_one': false,
        '#pseudo_sel_not :not(.container *) #pseudo_sel_not .click_tracker': false,
        '#pseudo_sel_not div:not(#pseudo_sel_not .container, #pseudo_sel_not .inner)': '#pseudo_sel_not .target, #pseudo_sel_not .datepicker',
        '#pseudo_sel_not input:not(input.foo)': '#pseudo_sel_not input.bar',
        '#pseudo_sel_not :not(.container *)': false,
        '#pseudo_sel_not :not(#pseudo_sel_not .container, #pseudo_sel_not .inner)': false,
        ':not(#pseudo_sel_not)': false
    },

    matchDom: {
        'li:odd': '.sel-odd'
    },

    unsupported: {
        'h2[foo!="bar"]': '.sel-attr-not-equals'
    },

    contextSelector: '.list-item',
    context: {
        'article': '.sel-in-context-node',
        'section article': '.sel-in-context-child',
        '#top_list': '.sel-in-context-id',
        '.top-list': '.sel-in-context-class'
    }

};
