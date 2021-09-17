import React from 'react';

class DemoHeader extends React.Component {

  constructor(props) {
    super(props);
    this.view = props.view;
    this.state = props.state;
  }

  render() {
    return (
      <header>
        <h1>Demo.</h1>
        <h4>
          <span>A demo single page application using </span>
          <a href="#">React.js</a>
          <span> and </span>
          <a href="#">OpenCms</a>.
        </h4>
      </header>
    )
  }
}

export default DemoHeader;
