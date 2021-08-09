import React from 'react';
import ReactDOM from 'react-dom';
import './step2.css';

class Demo32Page extends React.Component {

  constructor(props) {
    super(props);
    this.demo4 = props.demo4;
  }

  render() {
    const page = this.demo4.state.page;
    if (!page) {
      return (<div>Page</div>)
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
    const page = this.demo4.state.page;
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
    this.API = 'http://localhost';
    this.ENDPOINT = this.API + '/json';
    this.state = {
      page: null
    }
    this.loadPage();
  }

  render() {
    return (
      <div>
        <Demo32Page demo4={this}/>
      </div>
    )
  }

  loadPage() {
    const self = this;
    const uri = '/sites/default/mercury-demo/about/index.html';
    const params = '?content&locale=en&fallbackLocale=true&wrapper=true';
    const url = this.ENDPOINT + uri + params;
    fetch(url)
      .then(response => response.json())
      .then((page) => {
        self.setState({
          page: page
        });
      });
  }
}

export default Demo32;
