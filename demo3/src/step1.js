import React from 'react';
import ReactDOM from 'react-dom';
import './step1.css';
import ApiClient from './apiclient';

class Demo31Page extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
  }

  render() {
    const page = this.demo3.state.page;
    if (!page) {
      return (<div>Page</div>)
    }
    return (
      <div>
        <h2>Page Structure</h2>
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

class Demo31 extends React.Component {

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
        <Demo31Page demo3={this}/>
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

export default Demo31;
