import React from 'react';

/**
 * Class representing a section component.
 */
class Section extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    /** The demo 3 application. */
    this.demo3 = props.demo3;
    /** The content to render. */
    this.content = props.content;
    /** The formatter settings. */
    this.settings = props.settings;
  }

  /**
   * Renders this component according to formatter settings.
   */
  render() {
    const pieceLayout = this.settings.pieceLayout;
    const sectionTitle = this.renderTitle();
    const sectionText = this.renderText();
    const sectionLink = this.renderLink();
    const fullWidthImage = !(sectionTitle && sectionText && sectionLink);
    const pieceImage = this.renderImage(fullWidthImage);
    const pieceText = (
      <div>
      {sectionTitle}
      {sectionText}
      {sectionLink}
      </div>
    )
    if (pieceLayout === '6') { // image left, text right
      return (
        <div className="list">
        {this.showPieceImage() ? pieceImage : false}
        {this.showPieceText() ? pieceText : false}
        </div>
      )
    } else if (pieceLayout === '7') { // text left, image right
      return (
        <div className="list">
        {this.showPieceText() ? pieceText : false}
        {this.showPieceImage() ? pieceImage : false}
        </div>
      )
    }
    return (
      <div>Unknown pieceLayout setting: {pieceLayout}.</div>
    )
  }

  /**
   * Renders the image of this section.
   */
  renderImage(fullWidthImage) {
    const image = this.content.localeContent.Image;
    if (this.showImage() && image) {
      const imageTitle = image.Title;
      const imageLink = image.Image.link;
      const imageSrc = this.demo3.SERVER + imageLink;
      const classFull = fullWidthImage ? 'full' : null;
      return (
        <img src={imageSrc} alt={imageTitle} className={classFull}/>
      )
    }
    return false;
  }

  /**
   * Renders the link of this section.
   */
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

  /**
   * Renders the text of this section.
   */
  renderText() {
    const text = this.content.localeContent.Text;
    if (this.showText()) {
      return (
        <div dangerouslySetInnerHTML={{__html: text}}></div>
      )
    }
    return false;
  }

  /**
   * Renders the title of this section.
   */
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

  /**
   * Whether to show the image of this section according to the settings.
   */
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

  /**
   * Whether to show the link of this section according to the settings.
   */
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

  /**
   * Whether to show the image piece of this section. Same as showImage().
   */
  showPieceImage() {
    return this.showImage();
  }

  /**
   * Whether to show the text piece of this section. True
   * if either the text, the title, or the link is shown.
   */
  showPieceText() {
    return this.showLink() || this.showText() || this.showTitle();
  }

  /**
   * Whether to show the text of this section according to the settings.
   */
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

  /**
   * Whether to show the title of this section according to the settings.
   */
  showTitle() {
    const hsize = this.settings.hsize;
    return hsize !== '0';
  }
}

export default Section;
