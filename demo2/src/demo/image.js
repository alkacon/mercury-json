import React from 'react';

/**
 * Class representing an image content. Image is a nested content
 * used by higher-order contents or by other nested contents such as Paragraph.
 * @see {@link http://localhost/system/modules/alkacon.mercury.template/schemas/nested/image.xsd}
 */
class Image extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.demo = props.demo;
    this.content = props.content;
    this.alt = props.alt;
  }

  /**
   * Returns the URL of this image.
   */
  get imageUrl() {
    return this.demo.SERVER_IMAGE + this.content.Image.link;
  }

  /**
   * Renders this component.
   */
  render() {
    if (!this.content) {
      return false;
    }
    return (
      <img src={this.imageUrl} alt={this.alt}/>
    )
  }
}

export default Image;
