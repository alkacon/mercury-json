import React from 'react';
import Demo3Contact from './content/contact';
import Demo3Flexible from './content/flexible';
import Demo3LinksequenceHeader from './content/linksequenceheader';
import Demo3Navigation from './content/navigation';
import Demo3Section from './content/section';

class Demo3Content extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.step.demo3;
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
        <Demo3Section demo3={this.demo3} content={content}
            formatterKey={formatterKey} settings={settings}/>
      )
    } else if (formatterKey.startsWith('m/navigation/')) {
      component = (
        <Demo3Navigation demo3={this.demo3} content={content}
            formatterKey={formatterKey} settings={settings}/>
      )
    } else if (formatterKey === 'm/element/flexible') {
      component = (
        <Demo3Flexible demo3={this.demo3} content={content}
            formatterKey={formatterKey} settings={settings}/>
      )
    } else if (formatterKey === 'm/element/linksequence-header') {
      component = (
        <Demo3LinksequenceHeader demo3={this.demo3} content={content}
            formatterKey={formatterKey} settings={settings}/>
      )
    } else if (formatterKey === 'm/element/contact') {
      component = (
        <Demo3Contact demo3={this.demo3} content={content}
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

export default Demo3Content;
