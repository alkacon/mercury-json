import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Demo41 from './step1';
import Demo42 from './step2';
import Demo43 from './step3';
import Demo44 from './step4';
import Demo45 from './step5';
import Demo46 from './step6';
import Demo47 from './step7';
import './index.css';

class Demo4 extends React.Component {

  constructor(props) {
    super(props);
    this.SERVER = 'http://localhost';
    this.ENDPOINT = this.SERVER + '/json';
    this.URI = '/sites/default/mercury-demo/about/index.html';
    this.PARAMS = '?content&locale=en&fallbackLocale=true&wrapper=true';
    this.state = {
      page: null
    }
  }

  componentDidMount() {
    this.loadPage();
  }

  render() {
    return(
      <div>
        <h1>JSON API Demo 4</h1>
        <nav>
          <ul>
            <li>
              <Link to="/step1">Step 1</Link>
              <span>: Page Structure</span>
            </li>
            <li>
              <Link to="/step2">Step 2</Link>
              <span>: Page Layout</span>
            </li>
            <li>
              <Link to="/step3">Step 3</Link>
              <span>: Content Formatting</span>
            </li>
            <li>
              <Link to="/step4">Step 4</Link>
              <span>: Combined Page Layout and Content Formatting</span>
            </li>
            <li>
              <Link to="/step5">Step 5</Link>
              <span>: Header and Footer Layout</span>
            </li>
            <li>
              <Link to="/step6">Step 6</Link>
              <span>: Header and Footer Content Formatting</span>
            </li>
            <li>
              <Link to="/step7">Step 7</Link>
              <span>: Final Demo</span>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/step1">
            <div>
              <h2>Page Structure</h2>
              <Demo41 demo4={this} />
            </div>
          </Route>
          <Route path="/step2">
            <div>
              <h2>Page Layout</h2>
              <Demo42 demo4={this} />
            </div>
          </Route>
          <Route path="/step3">
            <div>
              <h2>Content Formatting</h2>
              <Demo43 demo4={this} />
            </div>
          </Route>
          <Route path="/step4">
            <div>
              <h2>Combined Page Layout and Content Formatting</h2>
              <Demo44 demo4={this} />
            </div>
          </Route>
          <Route path="/step5">
            <div>
              <h2>Header and Footer Layout</h2>
              <Demo45 demo4={this} />
            </div>
          </Route>
          <Route path="/step6">
            <div>
              <h2>Header and Footer Content Formatting</h2>
              <Demo46 demo4={this} />
            </div>
          </Route>
          <Route path="/step7">
            <div>
              <h2>Final Demo</h2>
              <Demo47 demo4={this} />
            </div>
          </Route>
        </Switch>
      </div>
    )
  }

  loadPage() {
    const self = this;
    const url = this.ENDPOINT + this.URI + this.PARAMS;
    fetch(url)
      .then(response => response.json())
      .then((page) => {
        self.setState({
          page: page
        });
      });
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Demo4 />
  </BrowserRouter>,
  document.getElementById("root")
);

export default Demo4;
