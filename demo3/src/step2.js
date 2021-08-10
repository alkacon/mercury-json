import React from 'react';
import Demo3 from './shared/demo3';
import Demo3Container from './shared/container';
import Demo3Containers from './shared/containers';
import Demo3Elements from './shared/elements';
import Demo3Element from './shared/element';

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
          <span class="modelgroup-legend">Modelgroup</span>
          <span class="layout-area-legend">Area</span>
          <span class="layout-row-legend">Row</span>
          <span class="layout-column-legend">Column</span>
          <span class="content-legend">Content</span>
        </div>
      </>
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
    const page = this.demo3.state.page;
    const path = element.path;
    const content = page.relatedContents[path];
    if (content.attributes.type === 'modelgroup') {
      return this.renderElementModelgroup();
    } else if (element.containers.length) {
      return this.renderElementLayout(element, content);
    } else {
      return this.renderElementContent();
    }
  }

  renderElementContent(content) {
    return (
      <div className="content"></div>
    )
  }

  renderElementLayout(element, content) {
    const type = content.attributes.type;
    if (type === 'm-layout-area-simple') {
      return this.renderElementLayoutAreaSimple(element, content);
    } else if (type === 'm-layout-row-simple') {
      return this.renderElementLayoutRowSimple(element, content);
    } else {
      return (
        <div>Unknown layout type.</div>
      )
    }
  }

  renderElementLayoutAreaSimple(element, content) {
    const variant = content.localeContent.Variant;
    console.log(variant);
    if (variant === 'area-side-main') {
      return (
        <div className="layout-area">
          <div className="row layout-row">
            <div className="col-3 layout-col">
            {this.renderContainer(element.containers[0])}
            </div>
            <div className="col-9 layout-col">
            {this.renderContainer(element.containers[1])}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="layout-area">
          {this.renderContainers(element.containers)}
        </div>
      )
    }
  }

  renderElementLayoutRowSimple(element, content) {
    const variant = content.localeContent.Variant;
    if (variant === '4-4-4') {
      return (
        <div className="row layout-row">
          <div className="col-4 layout-col">
          {this.renderContainer(element.containers[0])}
          </div>
          <div className="col-4 layout-col">
          {this.renderContainer(element.containers[1])}
          </div>
          <div className="col-4 layout-col">
          {this.renderContainer(element.containers[2])}
          </div>
        </div>
      )
    } else {
      return (
        <div className="row layout-row">
          <div className="col-12 layout-col">
          {this.renderContainers(element.containers)}
          </div>
        </div>
      )
    }
  }

  renderElementModelgroup() {
    return (
      <div className="modelgroup"></div>
    )
  }
}

export default Demo32;
