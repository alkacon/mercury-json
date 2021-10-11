import React from 'react';

class DemoFooter extends React.Component {

  constructor(props) {
    super(props);
    this.view = props.view;
    this.state = props.state;
  }

  render() {
    return (
      <footer>
        <div>
          <h4>Demo using the OpenCms JSON API.</h4>
          <div className="flex column">
            <a href="https://documentation.opencms.org/opencms-documentation/more-opencms-features/headless-json-api/"
               target="_blank"
               className="doc">Read the API Documentation</a>
            <a href="https://github.com/alkacon/mercury-json"
               target="_blank"
               className="github">View the Demo Source on GitHub</a>
          </div>
        </div>
      </footer>
    )
  }
}

export default DemoFooter;
