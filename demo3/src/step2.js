import React from 'react';
import Demo3Container from './shared/container';
import Demo3Containers from './shared/containers';
import Demo3Elements from './shared/elements';
import Demo3Element from './shared/element';
import Demo3Layout from './shared/layout';
import Demo3Page from './shared/page';

class Demo32 extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
  }

  render() {
    return (
      <>
        <Demo3Page step={this}/>
        <h5>Legend</h5>
        <div>
          <span className="layout-modelgroup-legend">Modelgroup</span>
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
      <Demo3Containers step={this} page={page} containers={containers}/>
    )
  }

  renderContainer(page, container) {
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
    return (
      <div className="layout-content"></div>
    )
  }

  renderElementLayout(page, element, content) {
    return (
      <Demo3Layout step={this} page={page} element={element} content={content}/>
    )
  }

  renderElementModelgroup(page, element, modelgroup) {
    return (
      <div className="layout-modelgroup"></div>
    )
  }
}

export default Demo32;
