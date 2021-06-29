import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Demo1ContentList extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickDetail = this.handleClickDetail.bind(this);
    this.demo1 = props.demo1;
  }

  handleClickDetail(content) {
    this.demo1.loadContentDetail(content);
  }

  render() {
    let self = this;
    const itemList = Object.keys(this.demo1.state.result).map(function(key) {
      const item = self.demo1.state.result[key];
      const title = item.properties.Title;
      let src = item.isXmlContent && item.content.Paragraph[0].Image ?
          (self.demo1.API + item.content.Paragraph[0].Image.Image.link) :
          '/favicon.ico';
      return item.isXmlContent ? (
          <div class="demo1-list-item"
               onClick={(e) => self.handleClickDetail(key, e)}>
            <img src={src} class="demo1-list-item-img"></img>
            <span class="demo1-list-item-label">{title}</span>
          </div>
      ) : null;
    });
    return (
      <div class="demo1-list">
        <h3>{this.demo1.label[this.demo1.state.type]} (List)</h3>
        <div class="demo1-list-items">
        {itemList}
        </div>
      </div>
    );
  }
}

class Demo1ContentSelect extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.demo1 = props.demo1;
  }

  handleChange(event) {
    this.demo1.loadContentList(event.target.value);
  }

  render() {
    const optionList = this.demo1.typeList.map((content) =>
      <option value={content}>{this.demo1.label[content]}</option>
    );
    return (
      <div class="demo1-select">
        <label for="demo1Select">Please select a content type: </label>
        <select id="demo1Select"
                value={this.demo1.state.type}
                onChange={this.handleChange}>
          {optionList}
        </select>
      </div>
    );
  }
}

class Demo1Detail extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickList = this.handleClickList.bind(this);
    this.demo1 = props.demo1;
  }

  handleClickList(event) {
    event.preventDefault();
    this.demo1.loadContentList(this.demo1.state.type);
  }

  render() {
    return (
      <div>
        <h1>JSON API Demo 1</h1>
        <p><a href="." onClick={this.handleClickList}>Back</a> to the list.</p>
        { this.renderContent() }
      </div>
    );
  }

  renderArticle() {
    const result = this.demo1.state.result;
    const src = this.demo1.API + result.Paragraph[0].Image.Image.link;
    return (
      <div>
        <h3>{result.Title} (Detail)</h3>
        <p>by {result.Author}</p>
        <p>{result.Intro}</p>
        <img src={src} alt={result.Paragraph[0].Caption} width="500"/>
        <div dangerouslySetInnerHTML={{__html: result.Paragraph[0].Text}} />
      </div>
    );
  }

  renderContent() {
    if (this.demo1.isTypeArticle()) {
      return this.renderArticle();
    } else if (this.demo1.isTypeFaq()) {
      return this.renderFaq();
    } else {
      return (<div>Unknown content type.</div>);
    }
  }

  renderFaq() {
    const result = this.demo1.state.result;
    const src = this.demo1.API + result.Paragraph[0].Image.Image.link;
    return (
      <div>
        <h3>{result.Title} (Detail)</h3>
        <p>{result.Paragraph[0].Caption}</p>
        <img src={src} width="500"/>
        <div dangerouslySetInnerHTML={{__html: result.Paragraph[0].Text}} />
      </div>
    );
  }
}

class Demo1List extends React.Component {

  constructor(props) {
    super(props);
    this.demo1 = props.demo1;
  }

  componentDidMount() {
    this.demo1.loadContentList(this.demo1.state.type);
  }

  render() {
    return (
      <div>
        <h1>JSON API Demo 1</h1>
        <Demo1ContentSelect demo1={this.demo1} />
        <Demo1ContentList demo1={this.demo1} />
      </div>
    );
  }
}

class Demo1 extends React.Component {

  constructor(props) {
    super(props);
    this.API = 'http://localhost';
    this.ENDPOINT = this.API + '/json/sites/default/mercury-demo/.content/';
    this.TYPE_ARTICLE = 'article-m';
    this.TYPE_FAQ = 'faq-m';
    this.typeList = [this.TYPE_ARTICLE, this.TYPE_FAQ];
    this.label = {
      'article-m': 'Article',
      'faq-m': 'FAQ'
    };
    this.state = {
      type: this.TYPE_ARTICLE,
      content: null,
      result: {}
    };
  }

  loadContentDetail(content) {
    const self = this;
    const url = this.ENDPOINT + this.state.type + '/' + content + '?locale=en';
    fetch(url)
      .then(reponse => reponse.json())
      .then((result) => {
        self.setState({
          type: self.state.type,
          content: content,
          result: result
        })
      });
  }

  loadContentList(type) {
    const self = this;
    const url = this.ENDPOINT + type + '?content&locale=en';
    fetch(url)
      .then(response => response.json())
      .then((result) => {
        self.setState({
          type: type,
          content: null,
          result: result
        })
      });
  }

  isTypeArticle() {
    return this.state.type === this.TYPE_ARTICLE;
  }

  isTypeFaq() {
    return this.state.type === this.TYPE_FAQ;
  }

  render() {
    return this.state.content ? (<Demo1Detail demo1={this} />) :
        (<Demo1List demo1={this} />);
  }
}

ReactDOM.render(
  <Demo1 />,
  document.getElementById('root')
);
