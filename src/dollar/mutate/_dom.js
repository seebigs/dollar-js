
/**
 * Inserts an array of contents into the DOM
 * Note: if more than one elem in dollar instance, inserted Elements will be moved instead of cloned
 */

function domInsert (contentsArr, method) {
    // Flatten nested arrays
    var $targets = this;
    contentsArr = [].concat.apply([], contentsArr);

    var i, j, doInsert, content, frag, generatedNode;
    var colLen = contentsArr.length;
    var elemsLen = $targets.length;

    function nodeToFrag (node) {
        frag.appendChild(node);
        doInsert = true;
    }

    for (j = 0; j < elemsLen; j++) {
        doInsert = false;
        frag = docConstruct.createDocumentFragment();

        for (i = 0; i < colLen; i++) {
            content = contentsArr[i];

            if (content) {
                // content is String
                if (typeof content === strType) {
                    if (content[0] === '#') {
                        nodeToFrag($targets[j]);
                        $targets[j] = $(content)[0];
                    } else if (content[0] === '.') {
                        $targets = $(content);
                        elemsLen = $(content).length;
                        nodeToFrag(this[0].cloneNode(true));
                    } else if(generatedNode = htmlStringToNode(content)) {
                        nodeToFrag(generatedNode);
                    }

                // content is Element
                } else if (content.nodeType === 1) {
                    nodeToFrag(content);

                // content is dollar collection
                } else if (content.isDollar) {
                    content.each(nodeToFrag);

                // content is function
                } else if (typeof content === fnType) {
                    generatedNode = content($targets[j], j);

                    if (typeof generatedNode === strType) {
                        generatedNode = htmlStringToNode(generatedNode);
                    }

                    if (generatedNode) {
                        nodeToFrag(generatedNode);
                    }
                }
            }
        }

        if(doInsert) {
            method($targets[j], frag);
        }
    }

    return $targets;
}
