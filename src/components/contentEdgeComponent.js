'use strict';

var ContentEdgeComponent = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentDidMount: function () {
  },
  render: function () {
    return (
      <line x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} />
    );
  }
});
