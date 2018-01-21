import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:3000",
        timestamp: 'no timestamp yet',
        FEDERALBANK:'0',
        DCBBANK:'0'
    };

  }

// const  socket = openSocket('http://localhost:8000');





    componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  //in one function
  //  socket.emit('subscribeToPrice', 1000,'DCBBANK');
    //  socket.emit('subscribeToPrice',1500,'FEDERALBANK');
    //different loops
     socket.emit('FEDERALBANK',5000);
     socket.emit('DCBBANK', 5000);

}
  //  function subscribeToTimer1(cb) {  socket.on('FEDERALBANK', FEDERALBANK => cb(null, FEDERALBANK));}
    socket.on("login", data => this.setState({ response: data }));

     subscribeToTimer((err, timestamp) => this.setState({     timestamp   }));
     //  subscribeToTimer1((err, FEDERALBANK) => this.setState({    FEDERALBANK   }));
  }
  render() {
      const { response } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              The temperature in Florence is: {response} °F
            </p>
          : <p>Loading...</p>}
      </div>
 <p className="App-intro">
      This is the timer value: {this.state.timestamp}
      </p>
       <p className="App-intro">
      This is the timer value: {this.state.FEDERALBANK}
      </p>
       <p className="App-intro">
      This is the timer value: {this.state.DCBBANK}
      </p>
      </div>
    );
  }
}

export default App;
