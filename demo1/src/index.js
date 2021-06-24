import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class SpaContentList extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickDetail = this.handleClickDetail.bind(this);
    this.spa = props.spa;
  }

  handleClickDetail(file) {
    this.spa.loadContentDetail(file);
  }

  render() {
    let self = this;
    const itemList = Object.keys(this.spa.state.result).map(function(key) {
      const item = self.spa.state.result[key];
      const title = item.properties.Title;
      return item.isXmlContent === true ? (
          <div class="spa-list-item"
               onClick={(e) => self.handleClickDetail(key, e)}>
            <span>{title}</span>
          </div>
      ) : null;
    });
    return (
      <div class="spa-list">
        <h3>{this.spa.label[this.spa.state.content]} (List)</h3>
        <div class="spa-list-items">
        {itemList}
        </div>
      </div>
    );
  }
}

class SpaContentSelect extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.spa = props.spa;
  }

  handleChange(event) {
    this.spa.loadContentList(event.target.value);
  }

  render() {
    const optionList = this.spa.contentList.map((content) =>
      <option value={content}>{this.spa.label[content]}</option>
    );
    return (
      <div class="spa-select">
        <label for="spaSelect">Please select a content type: </label>
        <select id="spaSelect"
                value={this.spa.state.content}
                onChange={this.handleChange}>
          {optionList}
        </select>
      </div>
    );
  }
}

class SpaDetail extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickList = this.handleClickList.bind(this);
    this.spa = props.spa;
  }

  handleClickList(event) {
    event.preventDefault();
    this.spa.loadContentList(this.spa.state.content);
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
    const result = this.spa.state.result;
    const src = this.spa.API + result.Paragraph[0].Image.Image.link;
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
    if (this.spa.isContentArticle()) {
      return this.renderArticle();
    } else if (this.spa.isContentFaq()) {
      return this.renderFaq();
    } else {
      return (<div>Unknown content type.</div>);
    }
  }

  renderFaq() {
    const result = this.spa.state.result;
    const src = this.spa.API + result.Paragraph[0].Image.Image.link;
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

class SpaList extends React.Component {

  constructor(props) {
    super(props);
    this.spa = props.spa;
  }

  render() {
    return (
      <div>
        <h1>JSON API Demo 1</h1>
        <SpaContentSelect spa={this.spa} />
        <SpaContentList spa={this.spa} />
      </div>
    );
  }

  componentDidMount() {
    this.spa.loadContentList(this.spa.state.content);
  }
}

class Spa extends React.Component {

  constructor(props) {
    super(props);
    this.API = 'http://localhost';
    this.ENDPOINT = this.API + '/json/sites/default/mercury-demo/.content/';
    this.CONTENT_ARTICLE = 'article-m';
    this.CONTENT_FAQ = 'faq-m';
    this.contentList = [this.CONTENT_ARTICLE, this.CONTENT_FAQ];
    this.label = {
      'article-m': 'Article',
      'faq-m': 'FAQ'
    };
    this.state = {
      content: this.CONTENT_ARTICLE,
      file: null,
      result: {}
    };
  }

  loadContentDetail(file) {
    const self = this;
    const url = this.ENDPOINT + this.state.content + '/' + file + '?locale=en';
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        self.setState({
          content: self.state.content,
          file: file,
          result: result
        })
      });
  }

  loadContentList(content) {
    const self = this;
    const url = this.ENDPOINT + content;
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        self.setState({
          content: content,
          file: null,
          result: result
        })
      });
  }

  isContentArticle() {
    return this.state.content === this.CONTENT_ARTICLE;
  }

  isContentFaq() {
    return this.state.content === this.CONTENT_FAQ;
  }

  render() {
    return this.state.file ? (<SpaDetail spa={this} />) :
        (<SpaList spa={this} />);
  }
}

ReactDOM.render(
  <Spa />,
  document.getElementById('root')
);
