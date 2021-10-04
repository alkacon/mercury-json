import React from 'react';
import Image from './image';
import Paragraph from './paragraph';

/**
 * Class representing an article content.
 * @see {@link http://localhost/system/modules/alkacon.mercury.template/schemas/article.xsd}
 */
class Article extends React.Component {

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
   * Returns the author of this article;
   */
  get author() {
    return this.localeContent.Author;
  }

  /**
   * Returns the content path of this article.
   */
  get file() {
    return this.content.path;
  }

  /**
   * Returns the introduction of this article.
   */
  get intro() {
    return this.localeContent.Intro;
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
   * Returns the paragraphs of this article content.
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
   * Returns the title of this article.
   */
  get title() {
    return this.localeContent.Title;
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
    }
    return this.renderDefault();
  }

  /**
   * Renders a detail view of this article.
   */
  renderDefault() {
    return (
      <section className="detail">
        <h3>{this.title}</h3>
        <h4>by {this.author}</h4>
        <h4>{this.intro}</h4>
        {this.paragraphs}
      </section>
    );
  }

  /**
   * Renders an article preview to be used in a list view.
   */
  renderPreview() {
    const image = this.localeContent.Paragraph ?
        this.localeContent.Paragraph[0].Image : null;
    const imageAlt = this.title;
    return (
      <div className="list">
        <Image demo={this.demo} content={image} alt={imageAlt}/>
        <div>
          <small>m-article</small>
          <h3>{this.title}</h3>
          <a href="#" onClick={(e) => this.handleClickDetail(this.file, e)}>Read more</a>
        </div>
      </div>
    )
  }
}

export default Article;
