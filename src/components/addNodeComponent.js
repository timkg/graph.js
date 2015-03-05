'use strict';

var AddNodeComponent = React.createClass({
  handleMouseDown: function (e) {
    e.preventDefault();
    dispatcher.emit('intent:drag', this.getDOMNode(), e);
  },
  render: function () {
    return (
      <div className="toolbox-item node" onMouseDown={this.handleMouseDown}>
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <UINodeComponent cx={10} cy={10} r={10} />
        </svg>
        <p>add Node</p>
      </div>
    );
  }
});
