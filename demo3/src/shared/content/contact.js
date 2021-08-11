import React from 'react';

class Demo3Contact extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
    this.content = props.content;
    this.formatterKey = props.formatterKey;
    this.settings = props.settings;
  }

  render() {
    const organization = this.content.Organization;
    const link = this.content.Link;
    const linkDiv = link ? (
      <a target="_blank" href={link.URI.link}>{link.Text}</a>
    ) : false;
    return (
      <div>
        <div><strong>{organization}</strong></div>
        {linkDiv}
      </div>
    )
  }
}

export default Demo3Contact;
