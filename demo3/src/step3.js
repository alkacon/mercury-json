import React from 'react';
import './step3.css';
import ApiClient from './apiclient'

class Demo33Page extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
  }

  render() {
    const page = this.demo3.state.page;
    if (!page) {
      return (<div>Loading page...</div>)
    }
    return this.renderContainers(page.containers);
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
      return;
    } else if (element.containers.length) {
      return this.renderContainers(element.containers);
    } else {
      return this.renderElementContent(element, content);
    }
  }

  renderElementContent(element, content) {
    const type = content.attributes.type;
    const formatterKey = element.formatterKey;
    const settings = element.settings;
    const settingsList = Object.keys(settings).map(key => {
      return (
        <li key={key}>{key}: <strong>{settings[key]}</strong></li>
      )
    });
    return (
      <div>
        <hr/>
        <div className="content">
          <h4>Content</h4>
          <dl>
            <dt>Type</dt>
            <dd><strong>{type}</strong></dd>
            <dt>Formatter Key</dt>
            <dd><strong>{formatterKey}</strong></dd>
            <dt>Settings</dt>
            <dd>
              <ul>{settingsList}</ul>
            </dd>
          </dl>
        </div>
        {this.renderElementContentFormatter(element, content)}
      </div>
    )
  }

  renderElementContentFormatter(element, content) {
    const formatterKey = element.formatterKey;
    const settings = element.settings;
    const title = content.localeContent.Title;
    const text = content.localeContent.Text;
    const image = content.localeContent.Image;
    const link = content.localeContent.Link;
    if (formatterKey === 'm/section/text-only') {
      return (
        <div className="formatter">
        {title ? this.renderElementContentTitle(title, settings) : null}
        {text ? this.renderElementContentText(text, settings) : null}
        {link ? this.renderElementContentLink(link, settings) : null}
        </div>
      )
    } else if (formatterKey === 'm/section/iconbox') {
      const cssWrapper = settings.cssWrapper;
      const iconClass = settings.iconClass;
      return (
        <div className={'formatter ' + cssWrapper}>
          {title ? this.renderElementContentTitle(title, settings) : null}
          <div>[icon: {iconClass}]</div>
          {text ? this.renderElementContentText(text, settings) : null}
        </div>
      )
    } else if (formatterKey === 'm/section/text-image') {
      const visualOption = settings.visualOption;
      let textImage;
      if (visualOption === '99') {
        textImage = (
          <div className="row">
            <div className="col-12">
            {image ? this.renderElementContentImage(image, settings) : null}
            </div>
            <div className="col-12">
            {text ? this.renderElementContentText(text, settings) : null}
            </div>
          </div>
        )
      } else {
        textImage = (
          <div className="row">
            <div className="col-9">
            {text ? this.renderElementContentText(text, settings) : null}
            </div>
            <div className="col-3">
            {image ? this.renderElementContentImage(image, settings) : null}
            </div>
          </div>
        )
      }
      return (
        <div className="formatter">
        {title ? this.renderElementContentTitle(title, settings) : null}
        {textImage}
        {link ? this.renderElementContentLink(link, settings) : null}
        </div>
      )
    } else {
      return (
        <div className="formatter">
          <p>Formatter key {formatterKey} is not supported.</p>
        </div>
      )
    }
  }

  renderElementContentImage(image, settings) {
    const imageSrc = ApiClient.SERVER + image.Image.link;
    const imageAlt = image.Text;
    return (
      <img src={imageSrc} alt={imageAlt}/>
    )
  }

  renderElementContentLink(link, settings) {
    const linkText = link.Text;
    const linkUri = link.URI.link;
    const linkOption = settings.linkOption;
    if (linkOption === 'button') {
      return (
        <button>{linkText}</button>
      )
    } else {
      return (
        <a href={'#' + linkUri}>{linkText}</a>
      )
    }
  }

  renderElementContentText(text, settings) {
    return (
      <div dangerouslySetInnerHTML={{__html: text}}></div>
    )
  }

  renderElementContentTitle(title, settings) {
    const hsize = settings.hsize
    if (hsize === '1') {
      return (
        <h1>{title}</h1>
      )
    } else if (hsize === '2') {
      return (
        <h2>{title}</h2>
      )
    } else if (hsize === '3') {
      return (
        <h3>{title}</h3>
      )
    } else {
      return (
        <div>{title}</div>
      )
    }
  }
}

class Demo33 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: null
    }
    this.loadPage();
  }

  render() {
    return(
      <div>
        <h2>Content Formatting</h2>
        <Demo33Page demo3={this}/>
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

export default Demo33;
