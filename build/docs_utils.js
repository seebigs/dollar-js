/**
 * Docs for Utils module
 */

module.exports = [
    {
        signature: '$.utils.each( collection, iteratee )',
        name: 'each',
        comments: [
            'Iterate over each item in a collection',
            'Handles all types of collections gracefully (even undefined)'
        ],
        params: [
            {
                types: [
                    'Array',
                    'Object'
                ],
                name: 'collection',
                desc: 'A collection of items to iterate over'
            },
            {
                types: [
                    'Function'
                ],
                name: 'iteratee',
                desc: 'A function to be called once for each item that receives (value, key, collection) as arguments'
            }
        ],
        returns: 'DollarJS (chainable)',
        examples: [
            "$.utils.each(['foo', 'bar'], function(v, k){ console.log(v); })",
            "$.utils.each({ abc: 123, def: 456 }, function(v, k){ console.log(v); })"
        ]
    },
    {
        signature: '$.utils.extend( target, [additionalObjects...] )',
        name: 'extend',
        comments: [
            'Extend a target object with additional objects',
            'This mutates the target object'
        ],
        params: [
            {
                types: [
                    'Object'
                ],
                name: 'target',
                desc: 'The target object to be extended'
            },
            {
                types: [
                    'Object'
                ],
                name: 'additionalObjects...',
                desc: 'One or more additional objects containing properties to be merged onto the target',
                optional: true
            }
        ],
        returns: 'DollarJS (chainable)',
        examples: [
            "$.utils.extend({ abc: 123 }, { abc: 456 }, { def: 789 })"
        ]
    }
];
