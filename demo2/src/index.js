import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Class representing the demo 2 detail view.
 */
class Demo2Content extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.handleClickList = this.handleClickList.bind(this);
    this.demo2 = props.demo2;
  }

  /**
   * Handler. Called when the back-link is clicked.
   */
  handleClickList(event) {
    event.preventDefault();
    this.demo2.loadList();
  }

  /**
   * Renders this component.
   */
  render() {
    const content = this.demo2.state.content;
    const title = content.properties.Title;
    const type = content.attributes.type;
    let div;
    if (type === 'm-article') {
      div = this.renderArticle();
    } else if (type === 'm-faq') {
      div = this.renderFaq();
    } else {
      div = (
        <div>
          <h2>{title}</h2>
          <p>Just a demo page.</p>
        </div>
      )
    }
    return (
      <div>
        <h1>JSON API Demo 2</h1>
        <p><a href="." onClick={this.handleClickList}>Back</a> to the list.</p>
        {div}
      </div>
    );
  }

  /**
   * Renders an article detail view.
   */
  renderArticle() {
    const result = this.demo2.state.content;
    let src;
    if (result.localeContent.Paragraph[0].Image) {
      src = result.localeContent.Paragraph[0].Image.Image.link;
    }
    src = src ? this.demo2.SERVER + src : '/favicon.ico';
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
   * Renders a faq detail view.
   */
  renderFaq() {
    const result = this.demo2.state.content;
    let src;
    if (result.localeContent.Paragraph[0].Image) {
      src = result.localeContent.Paragraph[0].Image.Image.link;
    }
    src = src ? this.demo2.SERVER + src : '/favicon.ico';
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
 * Class representing the demo 2 list view.
 */
class Demo2List extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.handleClickContent = this.handleClickContent.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.demo2 = props.demo2;
  }

  /**
   * Load the list when the component did mount.
   */
  componentDidMount() {
    this.demo2.loadList();
  }

  /**
   * Handler. Called when a list item is clicked.
   */
  handleClickContent(content) {
    const path = content.path;
    this.demo2.loadContent(path);
  }

  /**
   * Handler. Called when the show more button is clicked.
   */
  handleShowMore(event) {
    this.demo2.loadListMore();
  }

  /**
   * Renders this component.
   */
  render() {
    return (
      <div>
        <h1>JSON API Demo 2</h1>
        {this.renderList()}
      </div>
    );
  }

  /**
   * Renders an article preview.
   */
  renderItemArticle(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Paragraph[0].Image)}
        <div className="demo2-list-item-label-wrapper">
          <div className="demo2-list-item-label">{item.properties.Title}</div>
        </div>
      </div>
    )
  }

  /**
   * Renders a contact preview.
   */
  renderItemContact(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Image)}
        <div className="demo2-list-item-label-wrapper">
          <div className="demo2-list-item-label">{item.properties.Title}</div>
        </div>
      </div>
    )
  }

  /**
   * Renders a decoy preview.
   */
  renderItemDecoy(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Image)}
        <div className="demo2-list-item-label-wrapper">
          <div className="demo2-list-item-label">{item.properties.Title}</div>
        </div>
      </div>
    )
  }

  /**
   * Renders an event preview.
   */
  renderItemEvent(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Paragraph[0].Image)}
        <div className="demo2-list-item-label-wrapper">
          <div className="demo2-list-item-label">{item.properties.Title}</div>
        </div>
      </div>
    )
  }

  /**
   * Renders a faq preview.
   */
  renderItemFaq(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Paragraph[0].Image)}
        <div className="demo2-list-item-label-wrapper">
          <div className="demo2-list-item-label">{item.properties.Title}</div>
        </div>
      </div>
    )
  }

  /**
   * Renders a imageseries preview.
   */
  renderItemImageseries(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Image[0])}
        <div className="demo2-list-item-label-wrapper">
          <div className="demo2-list-item-label">{item.properties.Title}</div>
        </div>
      </div>
    )
  }

  /**
   * Renders a job preview.
   */
  renderItemJob(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item.localeContent.Introduction.Image)}
        <div className="demo2-list-item-label-wrapper">
          <div className="demo2-list-item-label">{item.properties.Title}</div>
        </div>
      </div>
    )
  }

  /**
   * Renders a media preview.
   */
  renderItemMedia(item) {
    return (
      <div>
        {this.renderUtilPreviewImage(item)}
        <div className="demo2-list-item-label-wrapper">
          <div className="demo2-list-item-label">{item.properties.Title}</div>
        </div>
      </div>
    )
  }

  /**
   * Renders the list depending on the respective content type.
   */
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
        <div className="demo2-list-item"
             key={item.properties.Title + idx}
             onClick={(e) => self.handleClickContent(item, e)}>
          <small className="demo2-list-item-type">{item.attributes.type}</small>
          {div}
        </div>
      )
    }) : null;
    let pageInfo = '';
    let moreResults = true;
    if (list.listInfo) {
      let rows = this.demo2.state.rows > list.listInfo.numFound ?
          list.listInfo.numFound : this.demo2.state.rows;
      pageInfo += rows + '/' + list.listInfo.numFound;
      moreResults = this.demo2.state.rows < list.listInfo.numFound;
    }
    return (
      <div className="demo2-list">
        <h3>{list.Title}</h3>
        <Demo2SelectSort demo2={this.demo2}/>
        <div className="demo2-list-items">
        {itemList}
        </div>
        <div className="demo2-list-show-more">
          <span>{pageInfo} </span>
          <button className="demo2-list-show-more-button"
                  onClick={this.handleShowMore}
                  disabled={!moreResults}>
            <big>Show more...</big>
          </button>
        </div>
      </div>
    );
  }

  /**
   * Utility function to generate an image preview.
   */
  renderUtilPreviewImage(json) {
    const imageSrc = (!json || !json.Image || !json.Image.link) ?
        this.demo2.SERVER + '/.galleries/cliparts/default.png' :
        this.demo2.SERVER + json.Image.link;
    const imageTitle = (!json || !json.Image || !json.Image.Title) ? '' :
        json.Image.Title;
    const image = <img src={imageSrc}
             alt={imageTitle}
             className="demo2-list-item-img"/>;
    return (<div className="demo2-list-item-img-panel">{image}</div>)
  }
}

/**
 * Class representing an interactive component for sort selection.
 */
class Demo2SelectSort extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.demo2 = props.demo2;
  }

  /**
   * Handler. Called when a sort option is selected.
   */
  handleChange(event) {
    this.demo2.loadList(event.target.value);
  }

  /**
   * Renders this component.
   */
  render() {
    return (
      <div className="demo2-select-sort">
        <label htmlFor="demo2SelectSort">Sort by </label>
        <select id="demo2SelectSort"
                value={this.demo2.state.sort}
                onChange={this.handleChange}>
          <option value="DATE_ASC">Date ascending</option>
          <option value="DATE_DESC">Date descending</option>
          <option value="TITLE_ASC">Title ascending</option>
          <option value="TITLE_DESC">Title descending</option>
          <option value="ORDER_ASC">Order ascending</option>
          <option value="ORDER_DESC">Order descending</option>
        </select>
      </div>
    )
  }
}

/**
 * Class representing the demo 2 application.
 */
class Demo2 extends React.Component {

  /**
   * Creates a new component.
   */
  constructor(props) {
    super(props);
    /** The server URL. */
    this.SERVER = 'http://localhost';
    /** The API endpoint. */
    this.ENDPOINT = this.SERVER + '/json';
    /** The list configuration. */
    this.LIST = '/sites/default/mercury-demo/.content/list-m/list_00018.xml';
    /** The request params. */
    this.PARAMS = '?content&wrapper' + // request as much as possible information
        '&locale=en&fallbackLocale'; // request one locale with fallback
    /** The state of this component. */
    this.state = {
      content: null,
      list: {},
      sort: 'DATE_ASC',
      rows: 5
    };
  }

  /**
   * Load a content.
   */
  loadContent(path) {
    const self = this;
    const contentUrl = this.ENDPOINT + path + this.PARAMS;
    fetch(contentUrl)
      .then(response => response.json())
      .then((content) => {
        self.setState({
          content: content,
          list: self.state.list,
          sort: self.state.sort,
          rows: self.state.rows
        })
      });
  }

  /**
   * Loads a list, optionally for a given sort order and a given number of rows.
   */
  loadList(sort, rows) {
    const self = this;
    let listUrl = this.ENDPOINT + this.LIST + this.PARAMS;
    if (sort) {
      listUrl += '&sort=' + sort;
    } else {
      sort = '';
    }
    if (!rows) {
      rows = 5;
    }
    listUrl += '&rows=' + rows;
    fetch(listUrl)
      .then(response => response.json())
      .then((list) => {
        self.setState({
          content: null,
          list: list,
          sort: sort,
          rows: rows
        })
      });
  }

  /**
   * Load more results.
   */
  loadListMore() {
    const rows = this.state.rows + 5;
    this.loadList(this.state.sort, rows);
  }

  /**
   * Renders this component.
   */
  render() {
    return this.state.content ? <Demo2Content demo2={this} /> :
        <Demo2List demo2={this} />;
  }
}

/**
 * Render the demo 2 application.
 */
ReactDOM.render(
  <Demo2 />,
  document.getElementById('root')
);
