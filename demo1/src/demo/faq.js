import React from 'react';
import Image from './image';
import Paragraph from './paragraph';

/**
 * Class representing a FAQ content.
 * @see {@link http://localhost/system/modules/alkacon.mercury.template/schemas/faq.xsd}
 */
class FAQ extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.demo = props.demo;
    this.content = props.content;
    this.mode = props.mode;
    this.handleClickDetail = this.handleClickDetail.bind(this);
  }

  /**
   * Returns the file of this FAQ.
   */
  get file() {
    const path = this.content.path;
    return path.substring(path.lastIndexOf('/') + 1);
  }

  /**
   * Returns the localized content. Depending on whether request parameter
   * wrapper was set to true or false, the localized content is either
   * contained in this.content.localeContent (true) or in this.content (false);
   */
  get localeContent() {
    return this.content.localeContent ? this.content.localeContent :
        this.content;
  }

  /**
   * Returns the question of this FAQ content.
   */
  get question() {
    return this.localeContent.Question;
  }

  /**
   * Returns the paragraphs of this FAQ content.
   */
  get paragraphs() {
    if (!this.localeContent.Paragraph) {
      return false;
    }
    const self = this;
    const paragraphs = this.localeContent.Paragraph.map(
        function(paragraph, idx) {
      return (
        <Paragraph demo={self.demo} content={paragraph} key={idx}/>
      )
    });
    return paragraphs;
  }

  /**
   * Handler. Called when clicking on the read more link.
   */
  handleClickDetail(content) {
    this.demo.loadContentDetail(content);
  }

  /**
   * Renders this component.
   */
  render() {
    if (this.mode === 'preview') {
      return this.renderPreview();
    } else {
      return this.renderDefault();
    }
  }

  /**
   * Renders a detail view of this FAQ.
   */
  renderDefault() {
    return (
      <section className="detail">
        <h2>{this.question}</h2>
        {this.paragraphs}
      </section>
    )
  }

  /**
   * Renders a FAQ preview to be used in a list view.
   */
  renderPreview() {
    const image = this.localeContent.Paragraph ?
        this.localeContent.Paragraph[0].Image : null;
    const imageAlt = this.question;
    return (
      <div className="list">
        <Image demo={this.demo} content={image} alt={imageAlt}/>
        <div>
          <small>m-faq</small>
          <h3>{this.question}</h3>
          <a href="#" onClick={(e) => this.handleClickDetail(this.file, e)}>Read more</a>
        </div>
      </div>
    )
  }
}

export default FAQ;
