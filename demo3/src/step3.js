import React from 'react';
import Demo3 from './shared/demo3';
import Demo3Container from './shared/container';
import Demo3Containers from './shared/containers';
import Demo3Content from './shared/content';
import Demo3Elements from './shared/elements';
import Demo3Element from './shared/element';

class Demo33 extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
  }

  render() {
    return (
      <Demo3 demo3={this.demo3} step={this} />
    )
  }

  renderContainers(containers) {
    return (
      <Demo3Containers step={this} containers={containers}/>
    )
  }

  renderContainer(container) {
    return (
      <Demo3Container step={this} container={container}/>
    )
  }

  renderElements(elements) {
    return (
      <Demo3Elements step={this} elements={elements}/>
    )
  }

  renderElement(element) {
    return (
      <Demo3Element step={this} element={element}/>
    )
  }

  renderElementContent(element, content) {
    const path = element.path;
    const type = content.attributes.type;
    const formatterKey = element.formatterKey;
    const settings = element.settings;
    const settingsList = Object.keys(settings).map(key => {
      return (
        <li key={key}>{key}: <strong>{settings[key]}</strong></li>
      )
    });
    return (
      <div className="content-item">
        <hr/>
        <h3>Content [{path}]</h3>
        <div className="info-content">
          <dl>
            <dt>Type</dt>
            <dd><strong>{type}</strong></dd>
            <dt>Formatter Key</dt>
            <dd><strong>{formatterKey}</strong></dd>
            <dt>Settings</dt>
            <dd>
              <ul>{settingsList}</ul>
            </dd>
          </dl>
        </div>
        <div className="info-formatter">
          <Demo3Content step={this} element={element} content={content}/>
        </div>
      </div>
    )
  }

  renderElementLayout(element, content) {
    return this.renderContainers(element.containers);
  }

  renderElementModelgroup() {
    return false;
  }
}

export default Demo33;
