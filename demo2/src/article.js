import React from 'react';

/**
 * Class representing a component for an article content.
 */
class Article extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.demo2 = props.demo2;
    this.content = props.content;
  }

  /**
   * Returns the author of this article. Null safe.
   */
  get author() {
    const author = this.content.localeContent.Author;
    return author ? author : false;
  }

  /**
   * Returns the caption of this article. Null safe.
   */
  get caption() {
    const localeContent = this.content.localeContent;
    const paragraph = localeContent.Paragraph;
    if (paragraph && paragraph instanceof Array && paragraph.length) {
      const caption = paragraph[0].Caption;
      if (caption) {
        return caption;
      }
    }
    return false;
  }

  /**
   * Returns the imageSrc of this article. Null safe.
   */
  get imageSrc() {
    const localeContent = this.content.localeContent;
    const paragraph = localeContent.Paragraph;
    if (paragraph && paragraph instanceof Array && paragraph.length) {
      const image = paragraph[0].Image;
      if (image) {
        let src = image.Image.link;
        src = src ? this.demo2.SERVER + src : '/favicon.ico';
        return src;
      }
    }
    return false;
  }

  /**
   * Returns the introduction of this article. Null safe.
   */
  get intro() {
    const intro = this.content.localeContent.Intro;
    return intro ? intro : false;
  }

  /**
   * Returns the text of this article. Null safe.
   */
  get text() {
    const localeContent = this.content.localeContent;
    const paragraph = localeContent.Paragraph;
    if (paragraph && paragraph instanceof Array && paragraph.length) {
      const text = paragraph[0].Text;
      if (text) {
        return text;
      }
    }
    return false;
  }

  /**
   * Returns the title of this article. Null safe.
   */
  get title() {
    const title = this.content.localeContent.Title;
    return title ? title : false;
  }

  /**
   * Renders this component.
   */
  render() {
    return (
      <>
        <h2>{this.title}</h2>
        <h4>by {this.author}</h4>
        <h4>{this.intro}</h4>
        <img src={this.imageSrc} alt={this.caption ? this.caption : this.title}/>
        <div dangerouslySetInnerHTML={{__html: this.text}} />
      </>
    );
  }
}

export default Article;
