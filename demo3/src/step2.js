import React from 'react';
import './step2.css';
import ApiClient from './apiclient';

class Demo32Page extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
  }

  render() {
    const page = this.demo3.state.page;
    if (!page) {
      return (<div>Loading page...</div>)
    }
    return (
      <div>
        <h2>Page Layout</h2>
        {this.renderContainers(page.containers)}
      </div>
    )
  }

  renderContainers(containers) {
    const self = this;
    const containerList = containers.map((container, idx) => {
      return (
        <div key={container.name}>
        {self.renderContainer(container)}
        </div>
      )
    });
    return containerList;
  }

  renderContainer(container) {
    const elements = container.elements;
    return this.renderElements(elements);
  }

  renderElements(elements) {
    const self = this;
    const elementList = elements.map((element, idx) => {
      return (
        <div key={element.path}>
        {self.renderElement(element)}
        </div>
      )
    });
    return elementList;
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
      <div className="content">Content</div>
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
        <div>Unknown type</div>
      )
    }
  }

  renderElementLayoutAreaSimple(element, content) {
    const variant = content.localeContent.Variant;
    if (variant === 'area-side-main') {
      return (
        <div className="area">
          <div className="row">
            <div className="col-3">
            {this.renderContainer(element.containers[0])}
            </div>
            <div className="col-9">
            {this.renderContainer(element.containers[1])}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="area">
          {this.renderContainers(element.containers)}
        </div>
      )
    }
  }

  renderElementLayoutRowSimple(element, content) {
    const variant = content.localeContent.Variant;
    if (variant === '4-4-4') {
      return (
        <div className="row">
          <div className="col-4">
          {this.renderContainer(element.containers[0])}
          </div>
          <div className="col-4">
          {this.renderContainer(element.containers[1])}
          </div>
          <div className="col-4">
          {this.renderContainer(element.containers[2])}
          </div>
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="col-12">
          {this.renderContainers(element.containers)}
          </div>
        </div>
      )
    }
  }

  renderElementModelgroup() {
    return (
      <div className="modelgroup">Modelgroup</div>
    )
  }
}

class Demo32 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: null
    }
    this.loadPage();
  }

  render() {
    return (
      <div>
        <Demo32Page demo3={this}/>
      </div>
    )
  }

  loadPage() {
    const self = this;
    const apiClient = new ApiClient();
    fetch(apiClient.url)
      .then(response => response.json())
      .then((page) => {
        self.setState({
          page: page
        });
      });
  }
}

export default Demo32;
