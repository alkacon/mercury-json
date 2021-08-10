import React from 'react';

class Demo3 extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
    this.step = props.step;
  }

  render() {
    const page = this.demo3.state.page;
    if (!page) {
      return (<div>Loading...</div>)
    }
    return this.step.renderContainers(page.containers);
  }
}

export default Demo3;
