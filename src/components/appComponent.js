'use strict';

var AppComponent = React.createClass({
  render: function () {
    return (
      <div>
        <StageComponent nodes={this.props.nodes} edges={this.props.edges} />
        <ToolboxComponent />
      </div>
    );
  }
});
