import React, { Component } from 'react';
import './App.css';
import {FullSlip,SlipItem} from "react-fullslip";

class App extends Component {
  render() {
    let options = {
      //navigation: true,
      activeClass: 'active',
      duration:500,
      transverse:true,
      navImage:[require('./assets/1.jpg'),require('./assets/2.jpg'),require('./assets/3.jpg')]
    };
    return (
      <div className="App">
        <FullSlip {...options}>
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
