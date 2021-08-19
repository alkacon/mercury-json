import React from 'react';
import Demo4Container from './shared/container';
import Demo4Containers from './shared/containers';
import Demo4Elements from './shared/elements';
import Demo4Page from './shared/page';

class Demo41 extends React.Component {

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
      <div className="containers">
        <div className="containers-label">
          <strong>{containers.length} Containers</strong>
        </div>
        <Demo4Containers step={this} page={page} containers={containers}/>
      </div>
    )
  }

  renderContainer(page, container) {
    return (
      <div className="container">
        <div className="container-label">
          <strong>Container. </strong>
          <span>[name: {container.name},</span>
          <span> type: {container.type},</span>
          <span> isNestedContainer: {'' + container.isNestedContainer}]</span>
        </div>
        <Demo4Container step={this} page={page} container={container}/>
      </div>
    )
  }

  renderElements(page, elements) {
    return (
      <div className="elements">
        <div className="elements-label">
          <strong>{elements.length} Elements</strong>
        </div>
        <Demo4Elements step={this} page={page} elements={elements}/>
      </div>
    )
  }

  renderElement(page, element) {
    const containers = element.containers;
    const path = element.path;
    return (
      <div className="element">
        <div className="element-label">
          <strong>Element </strong>
          <span>[path: {path}]</span>
        </div>
        {this.renderContainers(page, containers)}
      </div>
    )
  }
}

export default Demo41;
