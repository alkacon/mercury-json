import React from 'react';

class Demo3Elements extends React.Component {

  constructor(props) {
    super(props);
    this.step = props.step;
    this.elements = props.elements;
  }

  render() {
    const self = this;
    const elements = this.elements.map((element, idx) => {
      return (
        <div key={element.path}>
        {self.step.renderElement(element)}
        </div>
      )
    });
    return elements;
  }
}

export default Demo3Elements;
