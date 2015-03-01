function Graph (nodes, edges) {
  this.nodes = [];
  this.nodesIndex = {};
  this.edges = [];

  nodes.forEach(this.addNode, this);
  edges.forEach(function (edgeParams) {
    var from = this.nodesIndex['node-' + edgeParams.from];
    var to = this.nodesIndex['node-' + edgeParams.to];
    this.addEdge(from, to);
  }, this)
}

Graph.prototype.addNode = function (nodeParams) {
  var node = new Node(nodeParams)
  this.nodes.push(node);
  this.nodesIndex[node.id] = node;
}

Graph.prototype.addEdge = function (from, to) {
  var edge = new Edge(from, to);
  from.addOutgoingEdge(edge);
  to.addIncomingEdge(edge);
  this.edges.push(edge);
}

Graph.prototype.toJSON = function () {
  var nodes = this.nodes.map(function (node) { return node.toJSON(); });
  var edges = this.edges.map(function (edge) { return edge.toJSON(); });
  return {nodes: nodes, edges: edges};
}

Graph.prototype.nodesByDepth = function () {
  var nodes = [];
  this.nodes.forEach(function (node) {
    if (!nodes[node.depth]) { nodes[node.depth] = [] }
    nodes[node.depth].push(node);
  })
  return nodes;
}

function Node (nodeParams) {
  this.id = 'node-' + nodeParams.id;
  this.depth = parseInt(nodeParams.id.toString()[0], 10) - 1;
  this.incomingEdges = [];
  this.outgoingEdges = [];
}

Node.prototype.addIncomingEdge  = function (edge) {
  this.incomingEdges.push(edge);
}

Node.prototype.addOutgoingEdge  = function (edge) {
  this.outgoingEdges.push(edge);
}

Node.prototype.hasAncestor = function (ancestorNode) {
  var hasAncestor;

  var walk = function (node) {
    if (hasAncestor === true) {
      return true;
    }

    if (!node.incomingEdges.length) {
      hasAncestor = false;
    }

    node.incomingEdges.forEach(function (edge) {
      if (edge.from === ancestorNode) {
        hasAncestor = true;
      } else {
        walk(edge.from);
      }
    });
  }

  walk(this);
  return hasAncestor;
}

Node.prototype.hasAncestors = function (ancestorNodes) {
  var isChildOfAllAncestors = true;
  ancestorNodes.forEach(function (ancestorNode) {
    if (!isChildOfAllAncestors) { return; }
    isChildOfAllAncestors = this.hasAncestor(ancestorNode)
  }, this)
  return isChildOfAllAncestors;
}

Node.prototype.isStartOfBranch = function () {
  return this.outgoingEdges.length > 1;
}

Node.prototype.isEndOfBranch = function () {
  return this.incomingEdges.length > 1;
}

Node.prototype.getBranch = function () {
  if (!this.isStartOfBranch()) {
    return undefined;
  }

  var branch = {
    nodes: [this],
    edges: []
  };
  var startNode = this;
  var firstBranchLevelNodes = startNode.outgoingEdges.map(function (branchStartEdge) {
    return branchStartEdge.to;
  })

  var walk = function (node) {
    node.outgoingEdges.forEach(function (edge) {
      var node = edge.to;
      if (branch.nodes.indexOf(node) === -1) { branch.nodes.push(node); }
      if (branch.edges.indexOf(edge) === -1) { branch.edges.push(edge); }

      if (edge.to.incomingEdges.length === startNode.outgoingEdges.length &&
          node.hasAncestors(firstBranchLevelNodes)) {
        return;
      } else {
        walk(node);
      }
    });
  }

  walk(this);
  return branch;
}

Node.prototype.toJSON = function () {
  var incomingEdges = this.incomingEdges.map(function (edge) { return edge.toJSON(); });
  var outgoingEdges = this.outgoingEdges.map(function (edge) { return edge.toJSON(); });
  return {
    id: this.id,
    depth: this.depth,
    incomingEdges: incomingEdges,
    outgoingEdges: outgoingEdges
  };
}

function Edge (from, to) {
  this.id = 'edge-' + from.id + '-' + to.id;
  this.from = from;
  this.to = to;
}

Edge.prototype.toJSON = function () {
  return {id: this.id, from: this.from.id, to: this.to.id};
}
