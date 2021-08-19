import React from 'react';

class Demo4Section extends React.Component {

  constructor(props) {
    super(props);
    this.demo4 = props.demo4;
    this.content = props.content;
    this.formatterKey = props.formatterKey;
    this.settings = props.settings;
  }

  render() {
    if (this.formatterKey === 'm/section/iconbox') {
      return this.renderFormatterIconbox();
    } else if (this.formatterKey === 'm/section/image-minimal') {
      return this.renderFormatterImageMinimal();
    } else if (this.formatterKey === 'm/section/text-only') {
      return this.renderFormatterTextOnly();
    } else if (this.formatterKey === 'm/section/text-image') {
      return this.renderFormatterTextImage();
    } else {
      return (
        <div>Unknown section formatter {this.formatterKey}.</div>
      )
    }
  }

  renderFormatterIconbox() {
    const cssWrapper = this.settings.cssWrapper;
    const iconClass = this.settings.iconClass;
    return (
      <div className={cssWrapper}>
        {this.renderTitle()}
        <div>[icon: {iconClass}]</div>
        {this.renderText()}
      </div>
    )
  }

  renderFormatterImageMinimal() {
    return (
      <div>
      {this.renderImage()}
      </div>
    )
  }

  renderFormatterTextOnly() {
    const textOption = this.settings.textOption;
    return (
      <div className={textOption}>
      {this.renderTitle()}
      {this.renderText()}
      {this.renderLink()}
      </div>
    )
  }

  renderFormatterTextImage() {
    const visualOption = this.settings.visualOption;
    let textImage;
    if (visualOption === '99') {
      textImage = (
        <div className="row">
          <div className="col-12">
          {this.renderImage()}
          </div>
          <div className="col-12">
          {this.renderText()}
          </div>
        </div>
      )
    } else {
      textImage = (
        <div className="row">
          <div className="col-9">
          {this.renderText()}
          </div>
          <div className="col-3">
          {this.renderImage()}
          </div>
        </div>
      )
    }
    return (
      <div>
      {this.renderTitle()}
      {textImage}
      {this.renderLink()}
      </div>
    )
  }

  renderImage() {
    const image = this.content.Image;
    if (!image) {
      return false;
    }
    const imageSrc = this.demo4.SERVER + image.Image.link;
    const imageAlt = image.Text;
    return (
      <img src={imageSrc} alt={imageAlt}/>
    )
  }

  renderLink() {
    const link = this.content.Link;
    if (!link) {
      return false;
    }
    const linkText = link.Text;
    const linkUri = link.URI.link;
    const linkOption = this.settings.linkOption;
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

  renderText() {
    const text = this.content.Text;
    if (!text) {
      return false;
    }
    if (this.settings.textOption === 'none') {
      return false;
    }
    return (
      <div dangerouslySetInnerHTML={{__html: text}}></div>
    )
  }

  renderTitle() {
    const title = this.content.Title;
    if (!title) {
      return false;
    }
    const hsize = this.settings.hsize;
    if (hsize === '0') {
      return false;
    } else if (hsize === '1') {
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
    } else if (hsize === '4') {
      return (
        <h4>{title}</h4>
      )
    } else {
      return (
        <div>{title}</div>
      )
    }
  }
}

export default Demo4Section;
