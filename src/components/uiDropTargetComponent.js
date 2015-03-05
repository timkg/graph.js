'use strict';

var UIDropTargetComponent = React.createClass({
  componentWillMount: function () {
    dispatcher.on('dropped', this.handleDrop);
  },
  componentWillUnmount: function () {
    dispatcher.off('dropped', this.handleDrop);
  },
  handleDrop: function (event) {
    var pos = this.getDOMNode().getBoundingClientRect();
    if (Math.abs(pos.left - event.clientX) < 30 && Math.abs(pos.top - event.clientY) < 30) {
      dispatcher.emit('node.add', this.props.positionObject);
    }
  },
  render: function () {
    return (
      <circle className={this.props.type + " ui-node"}
        cx={this.props.cx}
        cy={this.props.cy}
        r={this.props.r}>
      </circle>
    );
  }
});
