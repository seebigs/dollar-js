var SPEC = {

    selectors: {

        matchJQuery: {
            'bad': '',
            '#slim_shady': 'sel-id',
            'div#slim_shady': 'sel-id-node',
            '#slim_shady.willy': 'sel-id-class',
            '.willy': 'sel-class',
            'div.wonka': 'sel-class-node',
            '.willy.wonka': 'sel-class-dual',
            'a': 'sel-elem',
            'p span': 'sel-descendant',
            'p > span': 'sel-child',
            'li:first-child': 'sel-first-child',
            'li:last-child': 'sel-last-child',
            'li:nth-child(2)': 'sel-nth-2',
            'li:nth-child(3n)': 'sel-nth-3n',
            'li:nth-child(even)': 'sel-even',
            'p.prev + p': 'sel-prev-next',
            'p.prev ~ p': 'sel-prev-sibling',
            'span:empty': 'sel-empty',
            'h2[foo]': 'sel-attr',
            'h2[foo="bar"]': 'sel-attr-equals',
            'h3[foo*="bar"]': 'sel-attr-contains',
            'h4[foo|="bar"]': 'sel-attr-contains-prefix',
            'h4[foo~="bar"]': 'sel-attr-contains-word',
            'h4[foo^="bar"]': 'sel-attr-starts-with',
            'h4[foo$="bar"]': 'sel-attr-ends-with',
            'button:disabled': 'sel-disabled',
            'input:checked': 'sel-checked',
            '#multiple1, #multiple2': 'sel-multiple'
        },

        unsupported: {
            'li:even': 'sel-even',
            'h2[foo!="bar"]': 'sel-attr-not-equals',
            'button:visible': 'sel-visible',
            'button:hidden': 'sel-hidden'
        },

        matchJQueryInContext: [
            [ '.list-item', 'section', 'sel-in-context-section' ],
            [ '.list-item', 'article', 'sel-in-context-article' ],
            [ '.list-item', 'div', 'sel-in-context-div' ]
        ]
    },

    customMatchers: {

        toMatchElementsWith: function(util, customEqualityTesters) {

            function arrayOfNodesToString (arr) {
                var ret = '[\n',
                    str, node, id, cl;

                for (var i = 0, len = arr.length; i < len; i++) {
                    str = '';
                    node = arr[i];
                    id = node.id;
                    cl = node.className;
                    str += node.nodeName.toLowerCase() + (id ? '#'+id : '') + (cl ? '.'+cl : '');
                    ret += str ? (i > 0 ? '\n' : '') + '   <' + str + '>' : '';
                }

                return ret + '\n]';
            }

            return {
                compare: function(actual, expected) {
                    var dollar = actual.get(),
                        dom = jQuery(expected ? '.'+expected : '').get();

                    var result = { pass: false };

                    if (actual) {
                        result.pass = util.equals(dollar, dom, customEqualityTesters);
                    }

                    if (result.pass) {
                        result.message = 'Expected ' + arrayOfNodesToString(dollar) + ' NOT to match ' + arrayOfNodesToString(dom);
                    } else {
                        result.message = 'Expected ' + arrayOfNodesToString(dollar) + '\nto match ' + arrayOfNodesToString(dom);
                    }

                    return result;
                }
            };
        }

    }

};
