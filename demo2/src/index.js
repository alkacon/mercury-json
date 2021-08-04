import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Demo2Content extends React.Component {

  constructor(props) {
    super(props);
    this.demo2 = props.demo2;
  }

  render() {
    return <div>Demo 2 Content</div>;
  }
}

class Demo2List extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickContent = this.handleClickContent.bind(this);
    this.demo2 = props.demo2;
  }

  componentDidMount() {
    this.demo2.loadList();
  }

  handleClickContent(content) {
    console.log('handleClickContent');
  }

  render() {
    return (
      <div>
        <h1>JSON API Demo 2</h1>
        {this.renderList()}
      </div>
    );
  }

  renderItemArticle(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Paragraph[0].Image)}
        <span class="demo2-list-item-label">{item.properties.Title}</span>
      </div>
    )
  }

  renderItemContact(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Image)}
        <span class="demo2-list-item-label">{item.properties.Title}</span>
      </div>
    )
  }

  renderItemDecoy(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Image)}
        <span class="demo2-list-item-label">{item.properties.Title}</span>
      </div>
    )
  }

  renderItemEvent(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Paragraph[0].Image)}
        <span class="demo2-list-item-label">{item.properties.Title}</span>
      </div>
    )
  }

  renderItemFaq(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Paragraph[0].Image)}
        <span class="demo2-list-item-label">{item.properties.Title}</span>
      </div>
    )
  }

  renderItemImageseries(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Image[0])}
        <span class="demo2-list-item-label">{item.properties.Title}</span>
      </div>
    )
  }

  renderItemJob(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Introduction.Image)}
        <span class="demo2-list-item-label">{item.properties.Title}</span>
      </div>
    )
  }

  renderItemMedia(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item)}
        <span class="demo2-list-item-label">{item.properties.Title}</span>
      </div>
    )
  }

  renderList() {
    const self = this;
    const list = this.demo2.state.list;
    const itemList = list.list ? list.list.map(function(item, idx) {
      const type = item.attributes.type;
      let div;
      if (type === 'm-article') {
        div = self.renderItemArticle(item);
      } else if (type === 'm-contact') {
        div = self.renderItemContact(item);
      } else if (type === 'm-decoy') {
        div = self.renderItemDecoy(item);
      } else if (type === 'm-event') {
        div = self.renderItemEvent(item);
      } else if (type === 'm-faq') {
        div = self.renderItemFaq(item);
      } else if (type === 'm-imageseries') {
        div = self.renderItemImageseries(item);
      } else if (type === 'm-job') {
        div = self.renderItemJob(item);
      } else if (type === 'm-media') {
        div = self.renderItemMedia(item);
      }
      return (
        <div class="demo2-list-item"
             key={item.properties.Title + idx}
             onClick={(e) => self.handleClickContent(item, e)}>
             <small class="demo2-list-item-type">{item.attributes.type}</small>
             {div}
        </div>
      )
    }) : null;
    return (
      <div class="demo2-list">
        <h3>{list.Title}</h3>
        <div class="demo2-list-items">
        {itemList}
        </div>
      </div>
    );
  }

  renderUtilPreviewImage(json) {
    const imageSrc = (!json || !json.Image || !json.Image.link) ?
        this.demo2.API + '/.galleries/cliparts/default.png' :
        this.demo2.API + json.Image.link;
    const imageTitle = (!json || !json.Image || !json.Image.Title) ? '' :
        json.Image.Title;
    const image = <img src={imageSrc}
             alt={imageTitle}
             class="demo2-list-item-img"/>;
    return image;
  }
}

class Demo2 extends React.Component {

  constructor(props) {
    super(props);
    this.API = 'http://localhost';
    this.ENDPOINT = this.API + '/json';
    this.state = {
      content: null,
      list: {}
    };
  }

  loadContent(path) {
    const self = this;
    const contentUrl = this.ENDPOINT + path;
    fetch(contentUrl)
      .then(response => response.json())
      .then((content) => {
        self.setState({
          content: content,
          list: self.state.list
        })
      });
  }

  loadList() {
    const self = this;
    const listConfigUrl = this.ENDPOINT +
        '/sites/default/mercury-demo/.content/list-m/list_00018.xml' +
        '?content&locale=en&wrapper=true'
    fetch(listConfigUrl)
      .then(response => response.json())
      .then((list) => {
        self.setState({
          content: null,
          list: list
        })
      });
  }

  render() {
    return this.state.content ? (<Demo2Content demo2={this} />) :
        (<Demo2List demo2={this} />);
  }
}

ReactDOM.render(
  <Demo2 />,
  document.getElementById('root')
);
