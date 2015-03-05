'use strict';

function LayoutProvider () {
  this.horizontalGridSize = 30;
  this.verticalGridSize = 30;
}

LayoutProvider.prototype.register = function (stage) {
  this.stage = stage;
  this.centerX = this.getWidth() / 2;
  this.centerY = this.getHeight() / 2;
};

LayoutProvider.prototype.getWidth = function () {
  return parseInt(this.stage.getAttribute('width'), 10);
};

LayoutProvider.prototype.getHeight = function () {
  return parseInt(this.stage.getAttribute('height'), 10);
};

LayoutProvider.prototype.center = function () {
  return this.position(0, 0);
};

LayoutProvider.prototype.position = function (x, y) {
  return {
    x: this.column(x),
    y: this.row(y)
  }
};

LayoutProvider.prototype.column = function (index) {
  return this.centerX + (index * this.horizontalGridSize)
};

LayoutProvider.prototype.row = function (index) {
  return this.centerY + (index * this.verticalGridSize)
};
