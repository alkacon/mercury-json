import React from 'react';
import './step1.css';

class Demo31 extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
  }

  render() {
    const page = this.demo3.state.page;
    if (!page) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        {this.renderContainers(page.containers)}
      </div>
    )
  }

  renderContainers(containers) {
    const self = this;
    const containerList = containers.map((container, idx) => {
      return self.renderContainer(container);
    });
    return (
      <div className="containers">
        <div className="containers-label">
          <strong>{containers.length} Containers</strong>
        </div>
        <div>{containerList}</div>
      </div>
    )
  }

  renderContainer(container) {
    return (
      <div className="container">
        <div className="container-label">
          <strong>Container. </strong>
          <span>[name: {container.name},</span>
          <span> type: {container.type}]</span>
        </div>
        {this.renderElements(container.elements)}
      </div>
    )
  }

  renderElements(elements) {
    const self = this;
    const elementList = elements.map((element, idx) => {
      return self.renderElement(element);
    });
    return (
      <div className="elements">
        <div className="elements-label">
          <strong>{elements.length} Elements</strong>
        </div>
        {elementList}
      </div>
    )
  }

  renderElement(element) {
    const path = element.path;
    return (
      <div className="element">
        <div>
          <strong>Element </strong>
          <span>[path: {path}]</span>
        </div>
        {this.renderContainers(element.containers)}
      </div>
    )
  }
}

export default Demo31;
