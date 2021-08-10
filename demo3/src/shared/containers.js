import React from 'react';

class Demo3Containers extends React.Component {

  constructor(props) {
    super(props);
    this.step = props.step;
    this.containers = props.containers;
  }

  render() {
    const self = this;
    const containers = this.containers.map((container, idx) => {
      return (
        <div key={container.name}>
        {self.step.renderContainer(container)}
        </div>
      )
    });
    return containers;
  }
}

export default Demo3Containers;
