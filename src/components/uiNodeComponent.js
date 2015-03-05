'use strict';

var UINodeComponent = React.createClass({
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
