import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Demo31 from './step1';
import Demo32 from './step2';
import Demo33 from './step3';
import Demo34 from './step4';
import './index.css';

class Demo3 extends React.Component {

  constructor(props) {
    super(props);
    this.SERVER = 'http://localhost';
    this.ENDPOINT = this.SERVER + '/json';
    this.URI = '/sites/default/mercury-demo/about/index.html';
    this.PARAMS = '?content&locale=en&fallbackLocale=true&wrapper=true';
    this.state = {
      page: null
    }
    this.loadPage();
  }

  render() {
    return(
      <div>
        <h1>JSON API Demo 3</h1>
        <nav>
          <ul>
            <li>
              <Link to="/step1">Step 1</Link>
            </li>
            <li>
              <Link to="/step2">Step 2</Link>
            </li>
            <li>
              <Link to="/step3">Step 3</Link>
            </li>
            <li>
              <Link to="/step4">Step 4</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/step1">
            <div>
              <h2>Page Structure</h2>
              <Demo31 demo3={this} />
            </div>
          </Route>
          <Route path="/step2">
            <div>
              <h2>Page Layout</h2>
              <Demo32 demo3={this} />
            </div>
          </Route>
          <Route path="/step3">
            <div>
              <h2>Content Formatting</h2>
              <Demo33 demo3={this} />
            </div>
          </Route>
          <Route path="/step4">
            <div>
              <h2>Complete Example</h2>
              <Demo34 demo3={this} />
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
    <Demo3 />
  </BrowserRouter>,
  document.getElementById("root")
);

export default Demo3;
