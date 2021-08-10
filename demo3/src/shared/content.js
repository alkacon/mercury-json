import React from 'react';

class Demo3Content extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.step.demo3;
    this.step = props.step;
    this.element = props.element;
    this.content = props.content;
  }

  render() {
    return this.renderFormatter();
  }

  renderFormatter() {
    const formatterKey = this.element.formatterKey;
    const settings = this.element.settings;
    const title = this.content.localeContent.Title;
    const text = this.content.localeContent.Text;
    const image = this.content.localeContent.Image;
    const link = this.content.localeContent.Link;
    if (formatterKey === 'm/section/text-only') {
      const textOption = settings.textOption;
      return (
        <div className={textOption}>
        {title ? this.renderSectionTitle(title, settings) : null}
        {text ? this.renderSectionText(text, settings) : null}
        {link ? this.renderSectionLink(link, settings) : null}
        </div>
      )
    } else if (formatterKey === 'm/section/iconbox') {
      const cssWrapper = settings.cssWrapper;
      const iconClass = settings.iconClass;
      return (
        <div className={cssWrapper}>
          {title ? this.renderSectionTitle(title, settings) : null}
          <div>[icon: {iconClass}]</div>
          {text ? this.renderSectionText(text, settings) : null}
        </div>
      )
    } else if (formatterKey === 'm/section/text-image') {
      const visualOption = settings.visualOption;
      let textImage;
      if (visualOption === '99') {
        textImage = (
          <div className="row">
            <div className="col-12">
            {image ? this.renderSectionImage(image, settings) : null}
            </div>
            <div className="col-12">
            {text ? this.renderSectionText(text, settings) : null}
            </div>
          </div>
        )
      } else {
        textImage = (
          <div className="row">
            <div className="col-9">
            {text ? this.renderSectionText(text, settings) : null}
            </div>
            <div className="col-3">
            {image ? this.renderSectionImage(image, settings) : null}
            </div>
          </div>
        )
      }
      return (
        <div>
        {title ? this.renderSectionTitle(title, settings) : null}
        {textImage}
        {link ? this.renderSectionLink(link, settings) : null}
        </div>
      )
    } else {
      return (
        <div>
          <p>Unknown formatter key {formatterKey}.</p>
        </div>
      )
    }
  }

  renderSectionImage(image, settings) {
    const imageSrc = this.demo3.SERVER + image.Image.link;
    const imageAlt = image.Text;
    return (
      <img src={imageSrc} alt={imageAlt}/>
    )
  }

  renderSectionLink(link, settings) {
    const linkText = link.Text;
    const linkUri = link.URI.link;
    const linkOption = settings.linkOption;
    if (linkOption === 'button') {
      return (
        <form action={'#' + linkUri} method="GET">
          <button type="submit">{linkText}</button>
        </form>
      )
    } else {
      return (
        <a href={'#' + linkUri}>{linkText}</a>
      )
    }
  }

  renderSectionText(text, settings) {
    if (settings.textOption === 'none') {
      return false;
    }
    return (
      <div dangerouslySetInnerHTML={{__html: text}}></div>
    )
  }

  renderSectionTitle(title, settings) {
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

export default Demo3Content;
