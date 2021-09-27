import React from 'react';

class DemoHeader extends React.Component {

  constructor(props) {
    super(props);
    this.title = props.title;
  }

  render() {
    return (
      <header>
        <h1>{this.title}</h1>
        <h4>
          <span>A demo single page application using </span>
          <a href="#">OpenCms</a>.
        </h4>
      </header>
    )
  }
}

export default DemoHeader;
