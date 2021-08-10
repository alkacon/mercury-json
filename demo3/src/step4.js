import React from 'react';
import Demo3 from './shared/demo3';
import Demo3Container from './shared/container';
import Demo3Containers from './shared/containers';
import Demo3Content from './shared/content';
import Demo3Elements from './shared/elements';
import Demo3Element from './shared/element';
import Demo3Layout from './shared/layout';

class Demo34 extends React.Component {

  constructor(props) {
    super(props)
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
    return (
      <Demo3Content step={this} element={element} content={content}/>
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

export default Demo34;
