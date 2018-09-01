
var addParentProperties = require('ast-parents');
var Bundl = require('bundl');
var esprima = require('esprima');
var octicons = require('octicons');
var path = require('path');
var traverse = require('ast-traverse');
var utils = require('seebigs-utils');

var docsForUtils = require('./docs_utils.js');

function isFnExport (node) {
    if (node.left) {
        if (node.left.type === 'MemberExpression') {
            var exp = node.left.object;
            if (exp.object && exp.object.name === '$' && exp.property.name === 'fn') { // we found our export
                return true;
            }
        }
    }
}

function parseNodeAsFnExport (node, parent, collection) {
    if (node.type === 'AssignmentExpression') {
        if (isFnExport(node)) {
            var leadingComments = node.parent.leadingComments;
            if (leadingComments) {
                var lastComment = leadingComments.pop();
                if (lastComment.value.indexOf('*\n') === 0) {
                    var signatureParams = [];
                    var comments = [];
                    var params = [];
                    var returns = '';
                    var moduleName = '';
                    var examples = [];

                    var lines = lastComment.value.split(/\n\s+\*/);
                    lines.shift(); // remove useless frist line
                    lines.forEach(function (lineRaw) {
                        var lineParts = lineRaw.trim().split(/\s+/);
                        if (lineParts[0].charAt(0) === '@') {
                            var firstPart = lineParts.shift();
                            if (lineParts.length) {
                                if (firstPart === '@return' || firstPart === '@returns') {
                                    returns = lineParts.join(' ');

                                } else if (firstPart === '@param' || firstPart === '@option') {
                                    var p = {};

                                    if (lineParts[0].charAt(0) === '{') {
                                        var t = lineParts.shift();
                                        p = {
                                            types: t.substr(1, t.length - 2).split('|'),
                                            name: lineParts.shift(),
                                            desc: lineParts.join(' ')
                                        };

                                    } else {
                                        p = {
                                            name: lineParts.shift(),
                                            desc: lineParts.join(' ')
                                        };
                                    }

                                    if (firstPart === '@option') {
                                        p.optional = true;
                                    }

                                    params.push(p);

                                } else if (firstPart === '@module') {
                                    moduleName = lineParts.join(' ');

                                } else if (firstPart === '@example') {
                                    examples.push(lineParts.join(' '));
                                }

                            }

                        } else {
                            comments.push(lineParts.join(' '));
                        }
                    });

                    if (!collection[moduleName]) {
                        collection[moduleName] = [];
                    }

                    params.forEach(function (param) {
                        if (param.optional) {
                            signatureParams.push('[' + param.name + ']');
                        } else {
                            signatureParams.push(param.name);
                        }
                    });

                    collection[moduleName].push({
                        signature: '.' + node.left.property.name + '( ' + signatureParams.join(', ') + ' )',
                        name: node.left.property.name,
                        comments: comments,
                        params: params,
                        returns: returns,
                        examples: examples
                    });
                }
            }
            return false; // stop traversing children
        }
    }
}

function generateHtml (docs, done) {
    var docsHtml = '';
    var githubMark = octicons['mark-github'].toSVG({ 'width': 45 });

    docs['$.utils'] = docsForUtils;

    var totalFiles = 3; // number of root-level files from below
    utils.each(docs, function (categoryDocs) {
        totalFiles += categoryDocs.length;
    });

    var totalWrites = 0;
    function writeComplete (f) {
        totalWrites++;
        if (totalWrites >= totalFiles) {
            done();
        }
    }

    utils.each(docs, function (categoryDocs, categoryName) {
        docsHtml += '<h2 class="module-name">' + categoryName + '</h2>';
        docsHtml += '<div class="methods"><table>';
        utils.each(categoryDocs, function (doc) {
            docsHtml += utils.template(utils.readFile('build/_docs_templates/_doc.html'), doc);

            if (doc.params.length) {
                doc.paramsTable = '<table>';
                doc.params.forEach(function (param) {
                    var paramTypes = [];
                    param.types.forEach(function (type) {
                        paramTypes.push('<a href="../../types/#' + type.toLowerCase() + '">' + type + '</a>');
                    });
                    doc.paramsTable += '<tr><td class="param-name">' + param.name + '</td><td class="param-types">{' + paramTypes.join('/') + '}' + (param.optional ? ' [optional]' : '') + '</td><td class="param-desc">' + param.desc + '</td></tr>';
                });
                doc.paramsTable += '</table>';

            } else {
                doc.paramsTable = '<p>none</p>';
            }

            utils.writeFile('docs/api/' + doc.name + '/index.html', utils.template(utils.readFile('build/_docs_templates/method.html'), doc), writeComplete);
        });
        docsHtml += '</table></div>';
    });

    // root-level files
    utils.writeFile('docs/api/index.html', utils.template(utils.readFile('build/_docs_templates/index.html'), { docs: docsHtml, githubMark: githubMark }), writeComplete);
    utils.writeFile('docs/api/index.css', utils.readFile('build/_docs_templates/index.css'), writeComplete);
    utils.writeFile('docs/api/method.css', utils.readFile('build/_docs_templates/method.css'), writeComplete);
}

Bundl.setTask('docs', function (done) {
    var docs = {};
    var ast = esprima.parse(utils.readFile(path.resolve('prebuilt/dollar.js')), { attachComment: true });

    addParentProperties(ast);

    traverse(ast, { pre: function (node, parent) {
        return parseNodeAsFnExport(node, parent, docs);
    } });

    utils.cleanDir('docs/api');
    generateHtml(docs, done);
});
