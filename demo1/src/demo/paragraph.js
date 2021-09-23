import React from 'react';
import Image from './image';

/**
 * Class representing a paragraph content. Paragraph is a nested content
 * used by higher-order contents such as FAQ and article.
 * @see {@link http://localhost/system/modules/alkacon.mercury.template/schemas/nested/paragraph.xsd}
 */
class Paragraph extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.demo = props.demo;
    this.content = props.content;
  }

  /**
   * Returns the caption of this paragraph.
   */
  get caption() {
    return this.content.Caption;
  }

  /**
   * Returns the image of this paragraph.
   */
  get image() {
    return this.content.Image;
  }

  /**
   * Returns the text of this paragraph.
   */
  get text() {
    return this.content.Text;
  }

  /**
   * Returns the title of this FAQ content.
   * For simplicity we ignore all FAQ paragraphs besides the first one.
   */
  get title() {
    return this.content.Title;
  }

  /**
   * Renders this component.
   */
  render() {
    return (
      <div>
        <h4>{this.caption}</h4>
        <Image demo={this.demo} content={this.image} alt={this.title}/>
        <div dangerouslySetInnerHTML={{__html: this.text}} />
      </div>
    )
  }
}

export default Paragraph;
