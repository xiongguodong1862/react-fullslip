import React, { Component } from 'react';
import './App.css';
import {FullSlip,SlipItem} from "react-fullslip";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FullSlip>
          <SlipItem style={{backgroundColor:'#C6E2FF'}}>
            page1
          </SlipItem>
          <SlipItem style={{backgroundColor:'#C1FFC1'}}>
            page2
          </SlipItem>
          <SlipItem style={{backgroundColor:'#FFEC8B'}}>
            page3
          </SlipItem>
        </FullSlip>
      </div>
    );
  }
}

export default App;
