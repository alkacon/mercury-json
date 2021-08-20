import React from 'react';

class Section extends React.Component {

  constructor(props) {
    super(props);
    this.demo3 = props.demo3;
    this.content = props.content;
    this.formatterKey = props.formatterKey;
    this.settings = props.settings;
  }

  render() {
    const pieceLayout = this.settings.pieceLayout;
    const sectionImageClass = this.showPieceText() ? 'm-section-piece-image' :
        'm-section-piece';
    let sectionTextClass = this.showPieceImage() ? 'm-section-piece-text' :
        'm-section-piece';
    if (this.showPieceImage() && pieceLayout === '6') {
      sectionTextClass += ' m-section-piece-text-padding';
    }
    const sectionImage = (
      <div className={sectionImageClass}>
      {this.renderImage()}
      </div>
    )
    const sectionText = (
      <div className={sectionTextClass}>
      {this.renderTitle()}
      {this.renderText()}
      {this.renderLink()}
      </div>
    )
    if (pieceLayout === '6') {
      return (
        <div className="m-section">
        {this.showPieceImage() ? sectionImage : false}
        {this.showPieceText() ? sectionText : false}
        </div>
      )
    } else if (pieceLayout === '7') {
      return (
        <div className="m-section">
        {this.showPieceText() ? sectionText : false}
        {this.showPieceImage() ? sectionImage : false}
        </div>
      )
    }
    return (
      <div>Unknown setting: pieceLayout {pieceLayout}.</div>
    )
  }

  renderImage() {
    const image = this.content.localeContent.Image;
    if (this.showImage() && image) {
      const imageTitle = image.Title;
      const imageLink = image.Image.link;
      const imageSrc = this.demo3.SERVER + imageLink;
      return (
        <img src={imageSrc} alt={imageTitle}/>
      )
    }
    return false;
  }

  renderLink() {
    const link = this.content.localeContent.Link;
    if (this.showLink() && link) {
      const linkUri = '#' + link.URI.link;
      const linkText = link.Text;
      return (
        <a href={linkUri}>{linkText}</a>
      )
    }
    return false;
  }

  renderText() {
    const text = this.content.localeContent.Text;
    if (this.showText()) {
      return (
        <div dangerouslySetInnerHTML={{__html: text}}></div>
      )
    }
    return false;
  }

  renderTitle() {
    const title = this.content.localeContent.Title;
    const hsize = this.settings.hsize;
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
    } else if (hsize === '4') {
      return (
        <h4>{title}</h4>
      )
    } else if (hsize === '0') {
      return false;
    }
    return (
      <h2>Title</h2>
    )
  }

  showImage() {
    const visualOption = this.settings.visualOption;
    let show = true;
    if (visualOption === '99') {
      show = true;
    } else if (visualOption === '0') {
      show = false;
    }
    return show;
  }

  showLink() {
    const linkOption = this.settings.linkOption;
    let show = true;
    if (linkOption === 'button') {
      show = true;
    } else if (linkOption === 'none') {
      show = false;
    }
    return show;
  }

  showPieceImage() {
    return this.showImage();
  }

  showPieceText() {
    return this.showLink() || this.showText() || this.showTitle();
  }

  showText() {
    const textOption = this.settings.textOption;
    let show = true;
    if (textOption === 'default') {
      show = true;
    } else if (textOption === 'none') {
      show = false;
    }
    return show;
  }

  showTitle() {
    const hsize = this.settings.hsize;
    return hsize !== '0';
  }
}

export default Section;
