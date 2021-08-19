import React from 'react';
import Demo4Container from './shared/container';
import Demo4Containers from './shared/containers';
import Demo4Elements from './shared/elements';
import Demo4Element from './shared/element';
import Demo4Layout from './shared/layout';
import Demo4Modelgroup from './shared/modelgroup';
import Demo4Page from './shared/page';

class Demo45 extends React.Component {

  constructor(props) {
    super(props);
    this.demo4 = props.demo4;
  }

  render() {
    return (
      <>
        <Demo4Page step={this}/>
        <h5>Legend</h5>
        <div>
          <span className="layout-modelgroup-legend">Modelgroup</span>
          <span className="layout-group-legend">Group</span>
          <span className="layout-area-legend">Area</span>
          <span className="layout-row-legend">Row</span>
          <span className="layout-column-legend">Column</span>
          <span className="layout-content-legend">Content</span>
        </div>
      </>
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
    return (
      <div className="layout-content"></div>
    )
  }

  renderElementLayout(page, element, content) {
    if (page.attributes.type !== 'modelgroup') {
      return false;
    }
    return (
      <Demo4Layout step={this} page={page} element={element} content={content}/>
    )
  }

  renderElementModelgroup(page, element, modelgroup) {
    return (
      <Demo4Modelgroup step={this} element={element} modelgroup={modelgroup}/>
    )
  }
}

export default Demo45;
