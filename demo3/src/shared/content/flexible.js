import React from 'react';

class Demo3Flexible extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
    this.content = props.content;
    this.formatterKey = props.formatterKey;
    this.settings = props.settings;
  }

  render() {
    const code = this.content.Code;
    if (!code) {
      return false;
    }
    return (
      <div dangerouslySetInnerHTML={{__html: code}}></div>
    )
  }
}

export default Demo3Flexible;
