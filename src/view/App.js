import React, {Component} from 'react';
import './App.css';
import './partials/Header.css';
export default class App extends Component {
  render() {
    return (
      <>
        <div class="navbar">
          <label>
            <input type="checkbox" />
            <div class="bar-wrapper">
              <div class="bar top-bar"></div>
              <div class="bar middle-bar"></div>
              <div class="bar bottom-bar"></div>
            </div>
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="50px" />
          </label>
        </div>
        <div class="container">
        <p>Home</p>
        </div>
      </>
    )
  }
}//End App Component
