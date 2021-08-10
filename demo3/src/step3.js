import React from 'react';
import Demo3 from './shared/demo3';
import Demo3Container from './shared/container';
import Demo3Containers from './shared/containers';
import Demo3Elements from './shared/elements';
import Demo3Element from './shared/element';

class Demo33 extends React.Component {

  constructor(props) {
    super(props);
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
    const path = element.path;
    const type = content.attributes.type;
    const formatterKey = element.formatterKey;
    const settings = element.settings;
    const settingsList = Object.keys(settings).map(key => {
      return (
        <li key={key}>{key}: <strong>{settings[key]}</strong></li>
      )
    });
    return (
      <div className="content-item">
        <hr/>
        <h3>Content [{path}]</h3>
        <div className="info-content">
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
      const textOption = settings.textOption;
      return (
        <div className={'info-formatter ' + textOption}>
        {title ? this.renderElementContentTitle(title, settings) : null}
        {text ? this.renderElementContentText(text, settings) : null}
        {link ? this.renderElementContentLink(link, settings) : null}
        </div>
      )
    } else if (formatterKey === 'm/section/iconbox') {
      const cssWrapper = settings.cssWrapper;
      const iconClass = settings.iconClass;
      return (
        <div className={'info-formatter ' + cssWrapper}>
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
        <div className="info-formatter">
        {title ? this.renderElementContentTitle(title, settings) : null}
        {textImage}
        {link ? this.renderElementContentLink(link, settings) : null}
        </div>
      )
    } else {
      return (
        <div className="info-formatter">
          <p>Formatter key {formatterKey} is not supported.</p>
        </div>
      )
    }
  }

  renderElementContentImage(image, settings) {
    const imageSrc = this.demo3.SERVER + image.Image.link;
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

  renderElementLayout(element, content) {
    return this.renderContainers(element.containers);
  }

  renderElementModelgroup() {
    return false;
  }
}

export default Demo33;
