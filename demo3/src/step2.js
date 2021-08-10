import React from 'react';
import Demo3 from './shared/demo3';
import Demo3Container from './shared/container';
import Demo3Containers from './shared/containers';
import Demo3Elements from './shared/elements';
import Demo3Element from './shared/element';
import Demo3Layout from './shared/layout';

class Demo32 extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
  }

  render() {
    return (
      <>
        <Demo3 demo3={this.demo3} step={this} />
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

  renderContainers(containers) {
    return (
      <Demo3Containers step={this} containers={containers} />
    )
  }

  renderContainer(container) {
    return (
      <Demo3Container step={this} container={container} />
    )
  }

  renderElements(elements) {
    return (
      <Demo3Elements step={this} elements={elements} />
    )
  }

  renderElement(element) {
    return (
      <Demo3Element demo3={this.demo3} step={this} element={element} />
    )
  }

  renderElementContent(content) {
    return (
      <div className="layout-content"></div>
    )
  }

  renderElementLayout(element, content) {
    return (
      <Demo3Layout step={this} element={element} content={content} />
    )
  }

  renderElementModelgroup() {
    return (
      <div className="layout-modelgroup"></div>
    )
  }
}

export default Demo32;
