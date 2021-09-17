import React from 'react';
import ReactDOM from 'react-dom';
import DemoFooter from './demo/footer';
import DemoHeader from './demo/header';
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
        <div key={file} className="list">
          <img src={src} alt={heading}></img>
          <div>
            <h3>{heading}</h3>
            <a href="#" onClick={(e) => self.handleClickDetail(file, e)}>Read more</a>
          </div>
        </div>
      );
    });
    return itemList;
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
    const self = this;
    const currentType = this.demo1.state.type;
    const radioList = this.demo1.typeList.map((type) =>
      <label className="radio" key={type}>{self.demo1.label[type]}
        <input type="radio" name="content" value={type}
               checked={currentType === type}
               onChange={this.handleChange}/>
        <span className="checkmark"></span>
      </label>
    );
    return (
      <div>
        <h4>Content type</h4>
        {radioList}
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
      <>
        <h3 className="back">
          <a href="#" onClick={this.handleClickList}>Back</a>
        </h3>
        {this.renderContent()}
      </>
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
      <section class="detail">
        <h2>{title}</h2>
        <h4>by {author}</h4>
        <h4>{intro}</h4>
        <img src={src} alt={caption} width="500"/>
        <div dangerouslySetInnerHTML={{__html: text}} />
      </section>
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
      <section class="detail">
        <h4>{question}</h4>
        <h4>{caption}</h4>
        <img src={src} alt={title}/>
        <div dangerouslySetInnerHTML={{__html: text}} />
      </section>
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
      <>
        <section className="select">
          <Demo1ContentSelect demo1={this.demo1}/>
          <Demo1LocaleSelect demo1={this.demo1}/>
        </section>
        <section className="content">
          <Demo1ContentList demo1={this.demo1}/>
        </section>
      </>
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
    const currentLocale = this.demo1.state.locale;
    const radioList = this.demo1.localeList.map((locale) =>
      <label className="radio" key={locale}>{locale}
        <input type="radio" name="locale" value={locale}
               checked={currentLocale === locale}
               onChange={this.handleChange}/>
        <span className="checkmark"></span>
      </label>
    );
    return (
      <div>
        <h4>Locale</h4>
        {radioList}
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
    this.SERVER = process.env.REACT_APP_OPENCMS_SERVER;
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
    let view = this.state.content ? (<Demo1Detail demo1={this} />) :
        (<Demo1List demo1={this} />);
    return (
      <main>
        <div className="container">
          <DemoHeader />
          {view}
          <DemoFooter />
        </div>
      </main>
    )
  }
}

/**
 * Render the demo 1 application.
 */
ReactDOM.render(
  <Demo1 />,
  document.getElementById('root')
);
