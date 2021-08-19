import React from 'react';

class Demo4Flexible extends React.Component {

  constructor(props) {
    super(props);
    this.demo4 = props.demo4;
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

export default Demo4Flexible;
