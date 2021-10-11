import React from 'react';
import ReactDOM from 'react-dom';
import Article from './demo/article';
import Contact from './demo/contact';
import DemoFooter from './demo/footer';
import DemoHeader from './demo/header';
import FAQ from './demo/faq';
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
    this.demo2.loadList(this.demo2.state.sort, this.demo2.state.rows);
  }

  /**
   * Renders this component.
   */
  render() {
    const content = this.demo2.state.content;
    const title = content.properties.Title;
    const type = content.attributes.type;
    let component;
    if (type === 'm-article') {
      component = (<Article demo={this.demo2} content={content}/>);
    } else if (type === 'm-contact') {
      component = (<Contact demo={this.demo2} content={content}/>);
    } else {
      component = (
        <div>
          <h2>{title}</h2>
          <p>Unknown detail type: {type}.</p>
        </div>
      )
    }
    return (
      <>
        <h3 className="back">
          <a href="" onClick={this.handleClickList}>Back</a>
        </h3>
        {component}
      </>
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
   * Renders the list depending on the respective content type.
   */
  render() {
    const self = this;
    const list = this.demo2.state.list;
    const itemList = list.list ? list.list.map(function(item, idx) {
      const type = item.attributes.type;
      const key = item.properties.Title + idx;
      if (type === 'm-article') {
        return (
          <Article demo={self.demo2} content={item} key={key} mode="preview"/>
        )
      } else if (type === 'm-contact') {
        return (
          <Contact demo={self.demo2} content={item}  key={key} mode="preview"/>
        )
      } else if (type === 'm-faq') {
        return (
          <FAQ demo={self.demo2} content={item}  key={key} mode="preview"/>
        )
      } else {
        return (
          <div>Unknown content type.</div>
        )
      }
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
      <>
        <Demo2SelectSort demo2={this.demo2}/>
        {itemList}
        <div className="flex column">
          <h4>{pageInfo}</h4>
          <button onClick={this.handleShowMore}
                  disabled={!moreResults}>
            <big>Show more...</big>
          </button>
        </div>
      </>
    );
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
    const sort = this.demo2.state.sort;
    return (
      <section className="select">
        <div>
          <h4>Sort by</h4>
          <label className="radio">Date ascending
            <input type="radio" value="DATE_ASC" name="sort"
                   checked={sort === 'DATE_ASC'}
                   onChange={this.handleChange}/>
            <span className="checkmark"></span>
          </label>
          <label className="radio">Date descending
            <input type="radio" name="sort" value="DATE_DESC"
                   checked={sort === 'DATE_DESC'}
                   onChange={this.handleChange}/>
            <span className="checkmark"></span>
          </label>
          <label className="radio">Title ascending
            <input type="radio" name="sort" value="TITLE_ASC"
                   checked={sort === 'TITLE_ASC'}
                   onChange={this.handleChange}/>
            <span className="checkmark"></span>
          </label>
          <label className="radio">Title descending
            <input type="radio" name="sort" value="TITLE_DESC"
                   checked={sort === 'TITLE_DESC'}
                   onChange={this.handleChange}/>
            <span className="checkmark"></span>
          </label>
          <label className="radio">Order ascending
            <input type="radio" name="sort" value="ORDER_ASC"
                   checked={sort === 'ORDER_ASC'}
                   onChange={this.handleChange}/>
            <span className="checkmark"></span>
          </label>
          <label className="radio">Order descending
            <input type="radio" name="sort" value="ORDER_DESC"
                   checked={sort === 'ORDER_DESC'}
                   onChange={this.handleChange}/>
            <span className="checkmark"></span>
          </label>
        </div>
      </section>
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
    const contextPath = document.getElementById('root').dataset.contextPath;
    /** The server URL. */
    this.SERVER = contextPath === '${pageContext.request.contextPath}' ?
        process.env.REACT_APP_OPENCMS_SERVER : contextPath;
    /** The server URL without context path useful to link images. */
    this.SERVER_IMAGE = process.env.REACT_APP_OPENCMS_SERVER_IMAGE;
    /** The API endpoint. */
    this.ENDPOINT = this.SERVER + '/json';
    /** The list configuration. */
    this.LIST = '/sites/default/mercury-json/.content/list-m/list_00001.xml';
    /** The request params. */
    this.PARAMS = '?content&wrapper' + // request as much as possible information
        '&locale=en&fallbackLocale'; // request one locale with fallback
    /** The state of this component. */
    this.state = {
      content: null,
      list: {},
      sort: '',
      rows: 5
    };
  }

  /**
   * Load the list when the component did mount.
   */
  componentDidMount() {
    this.loadList();
  }

  /**
   * Load a content.
   */
  loadContentDetail(path) {
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
        });
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
    }
    if (!rows) {
      rows = 5;
    }
    listUrl += '&rows=' + rows;
    fetch(listUrl)
      .then(response => response.json())
      .then((list) => {
        if (!sort) {
          sort = list.SortOrder;
        }
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
    const view = this.state.content ? <Demo2Content demo2={this} /> :
        <Demo2List demo2={this} />;
    return (
      <main>
        <div className="container">
          <DemoHeader title="Demo 2"/>
          {view}
          <DemoFooter />
        </div>
      </main>
    )
  }
}

/**
 * Render the demo 2 application.
 */
ReactDOM.render(
  <Demo2 />,
  document.getElementById('root')
);
