import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Demo3Page extends React.Component {

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

class Demo3 extends React.Component {

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
        <h1>JSON API Demo 3</h1>
        <Demo3Page demo3={this}/>
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

ReactDOM.render(
  <Demo3 />,
  document.getElementById('root')
);
