
SPEC = {

    selectors: {

        ignored: {
            'undefined': void 0,
            'empty string': '',
            'null': null,
            'false': false,
            'true': true,
            'Number': 456,
            'Window': window,
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

        matchJQuery: {
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
            'input:checked': '.sel-checked',
            '#multiple1, #multiple2': '.sel-multiple'
        },

        unsupported: {
            'li:even': '.sel-even',
            'h2[foo!="bar"]': '.sel-attr-not-equals',
            'button:visible': '.sel-visible',
            'button:hidden': '.sel-hidden'
        },

        contextSelector: '.list-item',
        context: {
            'article': '.sel-in-context-node',
            'section article': '.sel-in-context-child',
            '#top_list': '.sel-in-context-id',
            '.top-list': '.sel-in-context-class'
        }

    }

};
