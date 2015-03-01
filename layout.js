function DefaultLayout (graph, width, height, nodeSize) {
  this.graph = graph;

  var nodesByDepth = graph.nodesByDepth();
  this.depth = nodesByDepth.length;
  this.breadth = breadth(nodesByDepth);
}

function breadth (nodesByDepth) {
  return nodesByDepth.slice(0).sort(function (a, b) { return b.length - a.length })[0].length
}

DefaultLayout.prototype.topAligned = function () {
  var nodes = this.graph.nodes.map(function (node) {

    if (node.isStartOfBranch()) {
      if (!node.incomingEdges.length) {
        node.pos = {x: node.depth + 1, y: this.breadth / 2};
        return node;
      } else {
        var branch = node.getBranch();
        var branchByDepth = Graph.prototype.nodesByDepth.call(branch);
        var branchBreadth = breadth(branchByDepth);
        node.pos = {x: node.depth + 1, y: node.incomingEdges[0].from.pos.y - branchBreadth / 3}
        return node;
      }
    }

    // straight path
    if (node.incomingEdges[0].from.outgoingEdges.length === 1 &&
        node.incomingEdges.length === 1) {
      node.pos = {x: node.depth + 1, y: node.incomingEdges[0].from.pos.y}
      return node;
    }

    // branching off
    if (node.incomingEdges[0].from.outgoingEdges.length > 1 &&
        node.incomingEdges.length === 1) {
      var index = node.incomingEdges[0].from.outgoingEdges.indexOf(node.incomingEdges[0]);
      var total = node.incomingEdges[0].from.outgoingEdges.length;
      var fraction = total/this.breadth;
      node.pos = {x: node.depth + 1, y: node.incomingEdges[0].from.pos.y + ((index * fraction) - (fraction/2))}
      return node;
    }

    // joining branches
    if (node.incomingEdges.length > 1) {
      var first = node.incomingEdges[0].from;
      var last = node.incomingEdges[node.incomingEdges.length -1].from;
      node.pos = {x: node.depth + 1, y: (first.pos.y + last.pos.y) / 2}
      return node;
    }

  }, this);

  return {nodes: nodes, edges: graph.edges};
}
