import React from 'react';

class Demo3Container extends React.Component {

  constructor(props) {
    super(props);
    this.step = props.step;
    this.page = props.page;
    this.container = props.container;
  }

  render() {
    const elements = this.container.elements;
    return this.step.renderElements(this.page, elements);
  }
}

export default Demo3Container;
