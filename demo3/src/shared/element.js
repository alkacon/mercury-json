import React from 'react';

class Demo3Element extends React.Component {

  constructor(props) {
    super(props);
    this.step = props.step;
    this.element = props.element;
  }

  render() {
    const page = this.step.demo3.state.page;
    const path = this.element.path;
    const content = page.relatedContents[path];
    if (content.attributes.type === 'modelgroup') {
      return this.step.renderElementModelgroup();
    } else if (this.element.containers.length) {
      return this.step.renderElementLayout(this.element, content);
    } else {
      return this.step.renderElementContent(this.element, content);
    }
  }
}

export default Demo3Element;
