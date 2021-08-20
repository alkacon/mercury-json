import React from 'react';
import ReactDOM from 'react-dom';
import Section from './section'
import './index.css';

class Demo3 extends React.Component {

  constructor(props) {
    super(props);
    this.SERVER = 'http://localhost';
    this.ENDPOINT = this.SERVER + '/json';
    this.URI = '/sites/default/mercury-json/demo-3/index.html';
    this.PARAMS = '?content&wrapper&locale=en&fallbackLocale';
    this.state = {
      page: null
    }
  }

  render() {
    if (!this.state.page) {
      return false;
    }
    const containers = this.state.page.containers;
    return (
      <>
        <h1>JSON API Demo 3</h1>
        {this.renderContainers(containers)}
      </>
    )
  }

  renderContainer(container) {
    const elements = container.elements;
    return this.renderElements(elements);
  }

  renderContent(content, formatterKey, settings) {
    const type = content.attributes.type;
    if (type === 'm-section') {
      return (
        <Section demo3={this}
                 content={content}
                 formatterKey={formatterKey}
                 settings={settings}/>
      )
    } else {
      return (
        <div>Content type {type} is not supported.</div>
      )
    }
  }

  renderContainers(containers) {
    const self = this;
    const html = containers.map(container => {
      return (
        <div key={container.name}>{self.renderContainer(container)}</div>
      )
    });
    return html;
  }

  renderElement(element) {
    const containers = element.containers;
    const formatterKey = element.formatterKey;
    const path = element.path;
    const content = this.state.page.linkedContents[path];
    const settings = element.settings;
    if (containers.length) {
      return this.renderContainers(containers);
    } else if (formatterKey && formatterKey.endsWith('/json')) {
      return this.renderContent(content, formatterKey, settings);
    } else {
      return false;
    }
  }

  renderElements(elements) {
    const self = this;
    const html = elements.map((element, idx) => {
      return (
        <div key={element.path + idx}>{self.renderElement(element)}</div>
      )
    });
    return html;
  }

  componentDidMount() {
    this.loadPage();
  }

  loadPage() {
    const self = this;
    const url = this.ENDPOINT + this.URI + this.PARAMS;
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
  <Demo3/>,
  document.getElementById('root')
);
