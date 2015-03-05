'use strict';

var ContentNodeComponent = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentDidMount: function () {
  },
  render: function () {
    return (
      <circle cx={this.props.cx}
              cy={this.props.cy}
              r={this.props.r}>
      </circle>
    );
  }
});
