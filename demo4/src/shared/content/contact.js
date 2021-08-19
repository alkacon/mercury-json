import React from 'react';

class Demo4Contact extends React.Component {

  constructor(props) {
    super(props);
    this.demo4 = props.demo4;
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

export default Demo4Contact;
