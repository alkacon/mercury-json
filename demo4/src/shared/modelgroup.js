import React from 'react';

class Demo4Modelgroup extends React.Component {

  constructor(props) {
    super(props);
    this.step = props.step;
    this.element = props.element;
    this.modelgroup = props.modelgroup;
  }

  render() {
    return (
      <div className="row layout-modelgroup">
        <div className="col-12">
        {this.step.renderContainers(this.modelgroup, this.modelgroup.containers)}
        </div>
      </div>
    )
  }
}

export default Demo4Modelgroup;
