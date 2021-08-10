import React from 'react';

class Demo3Layout extends React.Component {

  constructor(props) {
    super(props);
    this.step = props.step;
    this.element = props.element;
    this.content = props.content;
  }

  render() {
    const type = this.content.attributes.type;
    if (type === 'm-layout-area-simple') {
      return this.renderAreaSimple();
    } else if (type === 'm-layout-row-simple') {
      return this.renderRowSimple();
    } else {
      return (
        <div>Unknown layout type {type}.</div>
      )
    }
  }

  renderAreaSimple() {
    const variant = this.content.localeContent.Variant;
    if (variant === 'area-side-main') {
      return (
        <div className="layout-area">
          <div className="row layout-row">
            <div className="col-3 layout-col">
            {this.step.renderContainer(this.element.containers[0])}
            </div>
            <div className="col-9 layout-col">
            {this.step.renderContainer(this.element.containers[1])}
            </div>
          </div>
        </div>
      )
    } else if (variant === 'area-one-row') {
      return (
        <div className="layout-area">
          {this.step.renderContainers(this.element.containers)}
        </div>
      )
    } else {
      return (
        <div>Unknown layout area variant {variant}.</div>
      )
    }
  }

  renderRowSimple() {
    const variant = this.content.localeContent.Variant;
    if (variant === '4-4-4') {
      return (
        <div className="row layout-row">
          <div className="col-4 layout-col">
          {this.step.renderContainer(this.element.containers[0])}
          </div>
          <div className="col-4 layout-col">
          {this.step.renderContainer(this.element.containers[1])}
          </div>
          <div className="col-4 layout-col">
          {this.step.renderContainer(this.element.containers[2])}
          </div>
        </div>
      )
    } else if (variant === '12') {
      return (
        <div className="row layout-row">
          <div className="col-12 layout-col">
          {this.step.renderContainers(this.element.containers)}
          </div>
        </div>
      )
    } else {
      return (
        <div>Unknown layout row variant {variant}.</div>
      )
    }
  }
}

export default Demo3Layout;
