import React from 'react';
import Demo3Container from './shared/container';
import Demo3Containers from './shared/containers';
import Demo3Content from './shared/content';
import Demo3Elements from './shared/elements';
import Demo3Element from './shared/element';
import Demo3Layout from './shared/layout';
import Demo3Modelgroup from './shared/modelgroup';
import Demo3Page from './shared/page';

class Demo37 extends React.Component {

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
    return (
      <Demo3Content step={this} page={page} element={element} content={content}/>
    )
  }

  renderElementLayout(page, element, content) {
    return (
      <Demo3Layout step={this} page={page} element={element} content={content}/>
    )
  }

  renderElementModelgroup(page, element, modelgroup) {
    return (
      <Demo3Modelgroup step={this} modelgroup={modelgroup}/>
    )
  }
}

export default Demo37;
