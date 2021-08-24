import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Class rendering the contents of a folder.
 */
class Demo1ContentList extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.handleClickDetail = this.handleClickDetail.bind(this);
    this.demo1 = props.demo1;
  }

  /**
   * Handler. Called when clicking on a list item.
   */
  handleClickDetail(content) {
    this.demo1.loadContentDetail(content);
  }

  /**
   * Renders this component.
   */
  render() {
    let self = this;
    // iterate the folder listing
    const itemList = Object.keys(this.demo1.state.result).map(file => {
      const item = self.demo1.state.result[file];
      if (!item.isXmlContent) { // not a content file?
        return false;
      }
      // we use an article's title and a FAQ's question property as the
      // list item heading
      const heading = item.localeContent.Title ? item.localeContent.Title :
          item.localeContent.Question;
      let src;
      // the article content and the faq content both have a
      // paragraph list property with an embedded image property
      if (item.localeContent.Paragraph[0].Image) { // image exists?
        src = item.localeContent.Paragraph[0].Image.Image.link;
      }
      src = src ? self.demo1.SERVER + src : '/favicon.ico';
      return (
        <div key={file}
             className="demo1-list-item"
             onClick={(e) => self.handleClickDetail(file, e)}>
          <div className="demo1-list-item-img-panel">
            <img src={src} alt={heading} className="demo1-list-item-img"></img>
          </div>
          <div className="demo1-list-item-label-wrapper">
            <div className="demo1-list-item-label">{heading}</div>
          </div>
        </div>
      );
    });
    return (
      <div className="demo1-list">
        <h3>{this.demo1.label[this.demo1.state.type]} (List)</h3>
        <div className="demo1-list-items">
        {itemList}
        </div>
      </div>
    );
  }
}

/**
 * Class representing an interactive component for content type selection.
 */
class Demo1ContentSelect extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.demo1 = props.demo1;
  }

  /**
   * Handler. Called when a content type is selected.
   */
  handleChange(event) {
    this.demo1.loadContentList(event.target.value);
  }

  /**
   * Renders this component.
   */
  render() {
    const optionList = this.demo1.typeList.map((content) =>
      <option key={content} value={content}>{this.demo1.label[content]}</option>
    );
    return (
      <div className="demo1-select">
        <label htmlFor="demo1ContentSelect">Please select a content type: </label>
        <select id="demo1ContentSelect"
                value={this.demo1.state.type}
                onChange={this.handleChange}>
          {optionList}
        </select>
      </div>
    );
  }
}

/**
 * Class representing the demo 1 detail view component.
 */
class Demo1Detail extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.handleClickList = this.handleClickList.bind(this);
    this.demo1 = props.demo1;
  }

  /**
   * Handler. Called when the back-link is clicked.
   */
  handleClickList(event) {
    event.preventDefault();
    this.demo1.loadContentList(this.demo1.state.type);
  }

  /**
   * Renders this component.
   */
  render() {
    return (
      <div>
        <h1>JSON API Demo 1</h1>
        <p><a href="." onClick={this.handleClickList}>Back</a> to the list.</p>
        {this.renderContent()}
      </div>
    );
  }

  /**
   * Renders an article detail view.
   */
  renderArticle() {
    const result = this.demo1.state.result;
    let src;
    if (result.localeContent.Paragraph[0].Image) {
      src = result.localeContent.Paragraph[0].Image.Image.link;
    }
    src = src ? this.demo1.SERVER + src : '/favicon.ico';
    const title = result.localeContent.Title;
    const author = result.localeContent.Author;
    const intro = result.localeContent.Intro;
    const caption = result.localeContent.Paragraph[0].Caption;
    const text = result.localeContent.Paragraph[0].Text;
    return (
      <div>
        <h3>{title} (Detail)</h3>
        <p>by {author}</p>
        <p>{intro}</p>
        <img src={src} alt={caption} width="500"/>
        <div dangerouslySetInnerHTML={{__html: text}} />
      </div>
    );
  }

  /**
   * Renders a detail view depending on which content type is loaded.
   */
  renderContent() {
    if (this.demo1.isTypeArticle()) {
      return this.renderArticle();
    } else if (this.demo1.isTypeFaq()) {
      return this.renderFaq();
    } else {
      return (<div>Unknown content type.</div>);
    }
  }

  /**
   * Renders a faq detail view.
   */
  renderFaq() {
    const result = this.demo1.state.result;
    let src;
    if (result.localeContent.Paragraph[0].Image) {
      src = result.localeContent.Paragraph[0].Image.Image.link;
    }
    src = src ? this.demo1.SERVER + src : '/favicon.ico';
    const title = result.localeContent.Paragraph[0].Image.Image.link;
    const question = result.localeContent.Question;
    const caption = result.localeContent.Paragraph[0].Caption;
    const text = result.localeContent.Paragraph[0].Text;
    return (
      <div>
        <h3>{question} (Detail)</h3>
        <p>{caption}</p>
        <img src={src} alt={title} width="500"/>
        <div dangerouslySetInnerHTML={{__html: text}} />
      </div>
    );
  }
}

/**
 * Class representing the demo 1 list view component.
 */
class Demo1List extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.demo1 = props.demo1;
  }

  /**
   * Load the list when the component did mount.
   */
  componentDidMount() {
    this.demo1.loadContentList(this.demo1.state.type);
  }

  /**
   * Renders this component.
   */
  render() {
    return (
      <div>
        <h1>JSON API Demo 1</h1>
        <Demo1ContentSelect demo1={this.demo1}/>
        <Demo1LocaleSelect demo1={this.demo1}/>
        <Demo1ContentList demo1={this.demo1}/>
      </div>
    );
  }
}

/**
 * Class representing an interactive component for locale selection.
 */
class Demo1LocaleSelect extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.demo1 = props.demo1;
  }

  /**
   * Handler. Called when a locale is selected.
   */
  handleChange(event) {
    this.demo1.loadContentList(this.demo1.state.type, event.target.value);
  }

  /**
   * Renders this component.
   */
  render() {
    const optionList = this.demo1.localeList.map((locale) =>
      <option key={locale} value={locale}>{locale}</option>
    );
    return (
      <div className="demo1-select">
        <label htmlFor="demo1LocaleSelect">Please select a locale: </label>
        <select id="demo1LocaleSelect"
                value={this.demo1.state.locale}
                onChange={this.handleChange}>
          {optionList}
        </select>
      </div>
    );
  }
}

/**
 * Class representing the demo 1 application.
 */
class Demo1 extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    /** The server URL. */
    this.SERVER = 'http://localhost';
    /** The API endpoint. */
    this.API_ENDPOINT = this.SERVER + '/json';
    /** The content folder. */
    this.CONTENT_FOLDER = this.API_ENDPOINT +
        '/sites/default/mercury-demo/.content/';
    /** The request parameters. */
    this.PARAMS = '?content' + // embed contents in the folder listing
        '&wrapper'; // request the resource wrapper to get a title property
    /** The article content type. */
    this.TYPE_ARTICLE = 'article-m';
    /** The faq content type. */
    this.TYPE_FAQ = 'faq-m';
    /** The list of content types. */
    this.typeList = [this.TYPE_ARTICLE, this.TYPE_FAQ];
    /** Labels for the content types. */
    this.label = {
      'article-m': 'Article',
      'faq-m': 'FAQ'
    };
    /** The list of locales. */
    this.localeList = ['en', 'de'];
    /** The state of this React application. */
    this.state = {
      type: this.TYPE_ARTICLE,
      content: null,
      result: {},
      locale: 'en'
    };
  }

  /**
   * Loads the data for the detail view.
   */
  loadContentDetail(content, locale) {
    const self = this;
    if (!locale) {
      locale = this.state.locale;
    }
    const localeParam = '&locale=' + locale + '&fallbackLocale';
    const url = this.CONTENT_FOLDER + this.state.type + '/' + content +
        this.PARAMS + localeParam;
    fetch(url)
      .then(reponse => reponse.json())
      .then((result) => {
        self.setState({
          type: self.state.type,
          content: content,
          result: result,
          locale: locale
        })
      });
  }

  /**
   * Loads the data for the list view.
   */
  loadContentList(type, locale) {
    const self = this;
    if (!locale) {
      locale = this.state.locale;
    }
    const localeParam = '&locale=' + locale + '&fallbackLocale';
    const url = this.CONTENT_FOLDER + type + this.PARAMS + localeParam;;
    fetch(url)
      .then(response => response.json())
      .then((result) => {
        self.setState({
          type: type,
          content: null,
          result: result,
          locale: locale
        })
      });
  }

  /**
   * Returns whether the loaded content is an article content.
   */
  isTypeArticle() {
    return this.state.type === this.TYPE_ARTICLE;
  }

  /**
   * Returns whether the loaded content is a FAQ content.
   */
  isTypeFaq() {
    return this.state.type === this.TYPE_FAQ;
  }

  /**
   * Renders this component.
   */
  render() {
    return this.state.content ? (<Demo1Detail demo1={this} />) :
        (<Demo1List demo1={this} />);
  }
}

/**
 * Render the demo 1 application.
 */
ReactDOM.render(
  <Demo1 />,
  document.getElementById('root')
);
