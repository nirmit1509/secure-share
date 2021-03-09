import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SendRequestContract from '../abis/SendRequest.json';
import EncryptIPFSContract from '../abis/EncryptIPFS.json';
import Navbar from './Navbar';
import Main from './Main';
import MyUploads from './MyUploads';
import PendingRequests from './PendingRequests';
import RequestFile from './RequestFile';
import SharedWithMe from './SharedWithMe';
import getWeb3 from './getWeb3';

class App extends Component {

  async componentWillMount() {
    const web3 = await getWeb3();
    this.setState({ web3 });
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    this.setState({ networkId : networkId });
    const networkData1 = EncryptIPFSContract.networks[networkId];
    const networkData2 = SendRequestContract.networks[networkId];

    if(networkData1 && networkData2) {
      const encryptIPFSContract = web3.eth.Contract(EncryptIPFSContract.abi, networkData1.address)
      const sendRequestContract = web3.eth.Contract(SendRequestContract.abi, networkData2.address)
      this.setState({ encryptIPFSContract })
      this.setState({ sendRequestContract })
      this.setState({ loading: false});
    } else {
      window.alert('Your Contracts not deployed to detected network.')
    }       
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      networkId : '',
      web3: null,
      sendRequestContract : null,
      encryptIPFSContract : null,
      loading: true
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar account={this.state.account} />
          { this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            :
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/myUploads" exact render={props => (<MyUploads {...props} state={this.state} />) } />
              <Route path="/pending" exact render={props => (<PendingRequests {...props} state={this.state} />) } />
              <Route path="/request" exact render={props => (<RequestFile {...props} state={this.state} />) } />
              <Route path="/shared" exact render={props => (<SharedWithMe {...props} state={this.state} />) } />
            </Switch>  
          }
        </div>
      </Router>
    );
  }
}

export default App;