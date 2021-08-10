import React from 'react';

class Demo3Element extends React.Component {

  constructor(props) {
    super(props);
    this.step = props.step;
    this.element = props.element;
  }

  render() {
    const containers = this.element.containers;
    return this.step.renderContainers(containers)
  }
}

export default Demo3Element;
