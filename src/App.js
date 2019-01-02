import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AWS from 'aws-sdk';

const accessKey = require('./config/keys').amtAccessKey;
const secretKey = require('./config/keys').amtSecretKey;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mturkAccountBalance: null
    }
  }

  componentDidMount() {
    this.getAccountBalance();
   }

   getAccountBalance() {
    AWS.config.update({
      "accessKeyId": `${accessKey}`,
      "secretAccessKey": `${secretKey}`,
      "region": "eu-west-2"
    });
   
   const mTurkClient = new AWS.MTurk();
   mTurkClient.getAccountBalance((err, data) => {
    if (err) {
     console.warn("Error making the mTurk API call:", err);
    } else {
     // The call was a success
     const balance = `$${data.AvailableBalance}`;
     this.setState({ mturkAccountBalance: balance });
    }
   })
  }

  render() {
    var accountBalanceToDisplay = "loading...";
    if (this.state.mturkAccountBalance != null) {
      accountBalanceToDisplay = this.state.mturkAccountBalance
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            MTurk Application
          </p>
        </header>
        <p className="App-intro">
          Your account balance is {accountBalanceToDisplay}
        </p>
      </div>
    );
  }
}

export default App;
