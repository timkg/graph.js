function Renderer (stage, width, height, nodeSize, nodePadding) {
  this.stage = stage;
  this.width = width;
  this.height = height;
  this.nodeSize = nodeSize;
  this.nodePadding = nodePadding;
}

Renderer.prototype.render = function (graphLayout) {
  graphLayout.nodes.forEach(this.renderNode, this);
  graphLayout.edges.forEach(this.renderEdge, this);
}

Renderer.prototype.renderNode = function (node) {
  var circle = new Circle(node, node.pos.x * (this.nodeSize * 2 + this.nodePadding), node.pos.y * (this.nodeSize * 2 + this.nodePadding), this.nodeSize);
  node.element = circle;
  this.stage.appendChild(circle.render());
}

Renderer.prototype.renderEdge = function (edge) {
  var line = new Line(edge.from.element.right(), edge.to.element.left());
  this.stage.appendChild(line.render());
}


function Circle (node, x, y, r) {
  this.node = node;
  this.x = x;
  this.y = y;
  this.r = r;
}

Circle.prototype.left = function () {
  return {x: this.x - this.r, y: this.y};
}

Circle.prototype.right = function () {
  return {x: this.x + this.r, y: this.y};
}

Circle.prototype.render = function () {
  var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', this.x);
  circle.setAttribute('cy', this.y);
  circle.setAttribute('r', this.r);
  circle.setAttribute('id', this.node.id);
  return circle;
}

function Line (from, to) {
  this.x1 = from.x;
  this.y1 = from.y;
  this.x2 = to.x;
  this.y2 = to.y;
}

Line.prototype.render = function () {
  var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', this.x1);
  line.setAttribute('y1', this.y1);
  line.setAttribute('x2', this.x2);
  line.setAttribute('y2', this.y2);
  return line;
}
