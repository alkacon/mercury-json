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

class Demo3 extends React.Component {

  static get API() {
    return 'http://localhost';
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
            <Demo31/>
          </Route>
          <Route path="/step2">
            <Demo32/>
          </Route>
          <Route path="/step3">
            <Demo33/>
          </Route>
          <Route path="/step4">
            <h2>Step 4</h2>
          </Route>
        </Switch>
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Demo3 />
  </BrowserRouter>,
  document.getElementById("root")
);

export default Demo3;
