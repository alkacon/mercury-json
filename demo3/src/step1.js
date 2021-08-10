import React from 'react';
import Demo3 from './shared/demo3';
import Demo3Container from './shared/container';
import Demo3Containers from './shared/containers';
import Demo3Elements from './shared/elements';

class Demo31 extends React.Component {

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
      <div className="containers">
        <div className="containers-label">
          <strong>{containers.length} Containers</strong>
        </div>
        <Demo3Containers step={this} containers={containers}/>
      </div>
    )
  }

  renderContainer(container) {
    return (
      <div className="container">
        <div className="container-label">
          <strong>Container. </strong>
          <span>[name: {container.name},</span>
          <span> type: {container.type},</span>
          <span> isNestedContainer: {'' + container.isNestedContainer}]</span>
        </div>
        <Demo3Container step={this} container={container}/>
      </div>
    )
  }

  renderElements(elements) {
    return (
      <div className="elements">
        <div className="elements-label">
          <strong>{elements.length} Elements</strong>
        </div>
        <Demo3Elements step={this} elements={elements}/>
      </div>
    )
  }

  renderElement(element) {
    const containers = element.containers;
    const path = element.path;
    return (
      <div className="element">
        <div className="element-label">
          <strong>Element </strong>
          <span>[path: {path}]</span>
        </div>
        {this.renderContainers(containers)}
      </div>
    )
  }
}

export default Demo31;
