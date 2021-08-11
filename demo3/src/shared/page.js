import React from 'react';

class Demo3Page extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.step.demo3;
    this.step = props.step;
  }

  render() {
    const page = this.demo3.state.page;
    if (!page) {
      return (<div>Loading...</div>)
    }
    return this.step.renderContainers(page, page.containers);
  }
}

export default Demo3Page;
