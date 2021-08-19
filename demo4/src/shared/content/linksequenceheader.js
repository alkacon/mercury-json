import React from 'react';

class Demo4LinksequenceHeader extends React.Component {

  constructor(props) {
    super(props);
    this.demo4 = props.demo4;
    this.content = props.content;
    this.formatterKey = props.formatterKey;
    this.settings = props.settings;
  }

  render() {
    const linkEntries = this.content.LinkEntry;
    const linkEntryList = linkEntries.map((linkEntry, idx) => {
      const link = linkEntry.URI.link;
      const text = linkEntry.Text;
      const first = idx === 0 ? '| ' : ' ';
      return (
        <>
          <span>{first}</span>
          <a key={link} href={'#' + link}>{text}</a> |
        </>
      )
    });
    return (
      <nav class="linksequence-header">{linkEntryList}</nav>
    )
  }
}

export default Demo4LinksequenceHeader;
