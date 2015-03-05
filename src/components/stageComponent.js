'use strict';

var StageComponent = React.createClass({
  getInitialState: function () {
    return {
      targets: []
    }
  },
  componentWillMount: function () {
    dispatcher.on('showNodeDropArea', this.showNodeDropArea);
    dispatcher.on('hideNodeDropArea', this.hideNodeDropArea);
  },
  componentDidMount: function () {
    dispatcher.emit('stage.ready', this.getDOMNode());
  },
  showNodeDropArea: function (x, y, positionObject) {
    if (this.state.targets.filter(function (node) {
        return node.cx === x && node.cy === y;
      }).length) {
      return;
    }

    this.state.targets.push({cx: x, cy: y, r: 10, positionObject: positionObject});
    this.setState({targets: this.state.targets});
  },
  hideNodeDropArea: function (x, y) {
    var target = this.state.targets.filter(function (node) {
      return node.cx === x && node.cy === y;
    });
    this.state.targets.splice(this.state.targets.indexOf(target));
    this.setState({targets: this.state.targets});
  },
  render: function () {
    return (
      <svg className="stage" width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" version="1.1">
        {this.props.nodes.map(function (node) {
          return <ContentNodeComponent cx={node.cx} cy={node.cy} r={node.r} key={node.id} />
        })}
        {this.state.targets.map(function (node) {
          return <UIDropTargetComponent type={'util'} cx={node.cx} cy={node.cy} r={node.r} positionObject={node.positionObject} key={node.id} />
        })}
      </svg>
    );
  }
});
