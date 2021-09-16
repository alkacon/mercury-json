import React from 'react';
import ReactDOM from 'react-dom';
import Section from './section'
import './index.css';

/**
 * Class representing the demo 3 component.
 */
class Demo3 extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    /** The server URL. */
    this.SERVER =  process.env.REACT_APP_OPENCMS_SERVER;
    /** The JSON endpoint. */
    this.ENDPOINT = this.SERVER + '/json';
    /** The URI of the page we will render. */
    this.URI = '/sites/default/mercury-json/demo-3/sample-page/index.html';
    /** The request parameters. */
    this.PARAMS = '?content&wrapper&locale=en&fallbackLocale';
    /** The state of this component. */
    this.state = {
      page: null
    }
  }

  /**
   * Handler. Called when this component did mount.
   */
  componentDidMount() {
    this.loadPage();
  }

  /**
   * Loads the page.
   */
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

  /**
   * Renders this component.
   */
  render() {
    if (!this.state.page) {
      return false;
    }
    const containers = this.state.page.containers;
    return (
      <main>
        <div className="container">
          <section className="flex">
            <h1>Demo.</h1>
            <h4>
              <span>A demo single page application using </span>
              <a href="#">React.js</a>
              <span> and </span>
              <a href="#">OpenCms</a>.
            </h4>
          </section>
          {this.visitContainers(containers)}
          <footer>
            <div>
              <h4>Demo using the OpenCms JSON API</h4>
              <div className="flex column">
                <a href="#" className="doc">Read the API Documentation</a>
                <a href="#" className="github">View the Demo Source on GitHub</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    )
  }

  /**
   * Renders a content.
   */
  renderContent(content, settings) {
    const type = content.attributes.type;
    if (type === 'm-section') {
      return (
        <Section demo3={this} content={content} settings={settings}/>
      )
    } else {
      return (
        <div>Content type {type} is not supported.</div>
      )
    }
  }

  /**
   * Visits a container.
   */
  visitContainer(container) {
    const elements = container.elements;
    return this.visitElements(elements);
  }

  /**
   * Visit all containers of a page or an element.
   */
  visitContainers(containers) {
    const self = this;
    const html = containers.map(container => {
      return self.visitContainer(container);
    });
    return html;
  }

  /**
   * Visits an element. If the element has containers, visit them.
   * If the element has no containers, render the content.
   */
  visitElement(element) {
    const containers = element.containers;
    const formatterKey = element.formatterKey;
    const path = element.path;
    const content = this.state.page.linkedContents[path];
    const settings = element.settings;
    if (containers.length) {
      return this.visitContainers(containers);
    } else if (formatterKey && formatterKey.endsWith('/json')) {
      return this.renderContent(content, settings);
    } else {
      return false;
    }
  }

  /**
   * Visit all elements of a container.
   */
  visitElements(elements) {
    const self = this;
    const html = elements.map((element, idx) => {
      return self.visitElement(element);
    });
    return html;
  }
}

/**
 * Render the demo 3 application.
 */
ReactDOM.render(
  <Demo3/>,
  document.getElementById('root')
);
