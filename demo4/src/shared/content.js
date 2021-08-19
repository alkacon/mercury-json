import React from 'react';
import Demo4Contact from './content/contact';
import Demo4Flexible from './content/flexible';
import Demo4LinksequenceHeader from './content/linksequenceheader';
import Demo4Navigation from './content/navigation';
import Demo4Section from './content/section';

class Demo4Content extends React.Component {

  constructor(props) {
    super(props);
    this.demo4 = props.step.demo4;
    this.step = props.step;
    this.element = props.element;
    this.content = props.content;
  }

  render() {
    return this.renderFormatter();
  }

  renderFormatter() {
    const formatterKey = this.element.formatterKey;
    const content = this.content.localeContent;
    const settings = this.element.settings;
    let component;
    if (formatterKey.startsWith('m/section/')) {
      component = (
        <Demo4Section demo4={this.demo4} content={content}
            formatterKey={formatterKey} settings={settings}/>
      )
    } else if (formatterKey.startsWith('m/navigation/')) {
      component = (
        <Demo4Navigation demo4={this.demo4} content={content}
            formatterKey={formatterKey} settings={settings}/>
      )
    } else if (formatterKey === 'm/element/flexible') {
      component = (
        <Demo4Flexible demo4={this.demo4} content={content}
            formatterKey={formatterKey} settings={settings}/>
      )
    } else if (formatterKey === 'm/element/linksequence-header') {
      component = (
        <Demo4LinksequenceHeader demo4={this.demo4} content={content}
            formatterKey={formatterKey} settings={settings}/>
      )
    } else if (formatterKey === 'm/element/contact') {
      component = (
        <Demo4Contact demo4={this.demo4} content={content}
            formatterKey={formatterKey} settings={settings}/>
      )
    } else {
      component = (
        <div>Unknown formatter {formatterKey}.</div>
      )
    }
    return (
      <div className="content">{component}</div>
    )
  }
}

export default Demo4Content;
