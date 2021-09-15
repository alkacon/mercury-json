import React from 'react';
import Demo4Container from './shared/container';
import Demo4Containers from './shared/containers';
import Demo4Content from './shared/content';
import Demo4Elements from './shared/elements';
import Demo4Element from './shared/element';
import Demo4Page from './shared/page';

class Demo46 extends React.Component {

  constructor(props) {
    super(props);
    this.demo4 = props.demo4;
  }

  render() {
    return (
      <Demo4Page step={this}/>
    )
  }

  renderContainers(page, containers) {
    return (
      <Demo4Containers step={this} page={page} containers={containers}/>
    )
  }

  renderContainer(page, container) {
    if (container.type === 'header-config') {
      return false;
    }
    return (
      <Demo4Container step={this} page={page} container={container}/>
    )
  }

  renderElements(page, elements) {
    return (
      <Demo4Elements step={this} page={page} elements={elements}/>
    )
  }

  renderElement(page, element) {
    return (
      <Demo4Element step={this} page={page} element={element}/>
    )
  }

  renderElementContent(page, element, content) {
    if (page.attributes.type !== 'modelgroup') {
      return false;
    }
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
          <Demo4Content step={this} page={page} element={element} content={content}/>
        </div>
      </div>
    )
  }

  renderElementLayout(page, element, content) {
    if (page.attributes.type !== 'modelgroup') {
      return false;
    }
    return this.renderContainers(page, element.containers);
  }

  renderElementModelgroup(page, element, modelgroup) {
    return this.renderContainers(modelgroup, modelgroup.containers);
  }
}

export default Demo46;
