import React from 'react';

class Demo4Page extends React.Component {

  constructor(props) {
    super(props);
    this.demo4 = props.step.demo4;
    this.step = props.step;
  }

  render() {
    const page = this.demo4.state.page;
    if (!page) {
      return (<div>Loading...</div>)
    }
    return this.step.renderContainers(page, page.containers);
  }
}

export default Demo4Page;
