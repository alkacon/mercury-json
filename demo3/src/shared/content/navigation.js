import React from 'react';

class Demo3Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
    this.content = props.content;
    this.formatterKey = props.formatterKey;
    this.settings = props.settings;
  }

  render() {
    if (this.formatterKey === 'm/navigation/breadcrumbs') {
      return this.renderFormatterBreadcrumbs();
    } else if (this.formatterKey === 'm/navigation/main') {
      return this.renderFormatterMain();
    } else {
      return (
        <div>Unknown navigation formatter {this.formatterKey}.</div>
      )
    }
  }

  renderFormatterBreadcrumbs() {
    return (
      <div class="nav-breadcrumbs">Breadcrumbs Navigation</div>
    )
  }

  renderFormatterMain() {
    return (
      <div class="nav-main">Main Navigation</div>
    )
  }
}

export default Demo3Navigation;
