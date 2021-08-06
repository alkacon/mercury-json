import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Demo4 extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>JSON API Demo 4</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <Demo4 />,
  document.getElementById('root')
);
