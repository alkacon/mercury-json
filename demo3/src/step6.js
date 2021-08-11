import React from 'react';
import Demo3Container from './shared/container';
import Demo3Containers from './shared/containers';
import Demo3Content from './shared/content';
import Demo3Elements from './shared/elements';
import Demo3Element from './shared/element';
import Demo3Layout from './shared/layout';
import Demo3Modelgroup from './shared/modelgroup';
import Demo3Page from './shared/page';

class Demo36 extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
  }

  render() {
    return (
      <Demo3Page step={this}/>
    )
  }

  renderContainers(page, containers) {
    return (
      <Demo3Containers step={this} page={page} containers={containers}/>
    )
  }

  renderContainer(page, container) {
    if (container.type === 'header-config') {
      return false;
    }
    return (
      <Demo3Container step={this} page={page} container={container}/>
    )
  }

  renderElements(page, elements) {
    return (
      <Demo3Elements step={this} page={page} elements={elements}/>
    )
  }

  renderElement(page, element) {
    return (
      <Demo3Element step={this} page={page} element={element}/>
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
          <Demo3Content step={this} page={page} element={element} content={content}/>
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

export default Demo36;
