import React from 'react';

class Demo3Element extends React.Component {

  constructor(props) {
    super(props);
    this.step = props.step;
    this.page = props.page;
    this.element = props.element;
  }

  render() {
    const path = this.element.path;
    const content = this.page.relatedContents[path];
    if (!content) {
      return (
        <div>Related content not found: {path}.</div>
      )
    } else if (content.attributes.type === 'modelgroup') {
      return this.step.renderElementModelgroup(this.page, this.element, content);
    } else if (this.element.containers.length) {
      return this.step.renderElementLayout(this.page, this.element, content);
    } else {
      return this.step.renderElementContent(this.page, this.element, content);
    }
  }
}

export default Demo3Element;
