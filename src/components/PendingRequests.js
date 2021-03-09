import React, { Component } from 'react';
import Modal from 'react-modal';
import ipfs from './ipfs';
import "../css/Modal-style.css";
const ecies = require("eth-ecies");

class PendingRequests extends Component {

  async componentDidMount() {
    await this.loadBlockchainData()
    console.log('PendingRequests state', this.state)
  }

  async loadBlockchainData() {
    const sendRequestContract = this.state.sendRequestContract
    const requestCount = await sendRequestContract.methods.requestCount().call()
    this.setState({ requestCount })
    for (var i = 1; i <= this.state.requestCount; i++) {
      const request = await sendRequestContract.methods.requests(i).call()
      this.setState({ requests: [...this.state.requests, request] })
    }
    this.setState({ loading: false})
  }

  constructor(props) {
      super(props)
      this.state = {
          buffer: null,
          ipfsHash: '',
          encryptedHash: '', 
          requestCount: 0,
          requests: [], 
          request: null,
          account: this.props.state.account,
          web3: this.props.state.web3,
          networkId : this.props.state.networkId,
          sendRequestContract: this.props.state.sendRequestContract,
          encryptIPFSContract: this.props.state.encryptIPFSContract,
          loading: this.props.state.loading
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.uploadReport = this.uploadReport.bind(this)
        this.captureFile = this.captureFile.bind(this)
  }

  openModal(request) { this.setState({ showModal : true }); }
  closeModal() { this.setState({ showModal : false }); }
  
  captureFile(event) {
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
  }

  uploadReport(requester, pubKey) {
    ipfs.add(this.state.buffer, (err, ipfsHash) => {
      this.setState({ ipfsHash: ipfsHash[0].hash });
      let pubKeyBuffer = Buffer.from(pubKey, "hex");
      const encryptedHashBuffer = ecies.encrypt(pubKeyBuffer, Buffer.from(this.state.ipfsHash));
      const encryptedHash = encryptedHashBuffer.toString('hex');
      this.setState({ encryptedHash })
      this.state.encryptIPFSContract.methods.uploadReport(this.state.encryptedHash, requester).send({
        from: this.state.account
        }, (error, transactionHash) => {
          console.log("transaction hash is ",transactionHash);
        });
    })
  };

  render() {
    return (
      <div className="col-md-6" style={{ maxWidth: '90%' }}> 
      <p>&nbsp;</p> 

      <Modal isOpen={this.state.showModal} className="myModal" onRequestClose={this.closeModal} >
        <h2 style={{ textAlign: 'center' }}>Upload Report</h2>
        <br /> 
        <form onSubmit={(event) => {
          event.preventDefault()
          const requester = this.fileRequester.value
          const pubKey = this.requesterPubKey.value
          this.uploadReport(requester, pubKey)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="fileName"
              type="text"
              //value = { this.state.request.fileName }
              ref={(input) => { this.fileName = input }}
              className="form-control"
              placeholder="Name of requested file"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="fileRequester"
              type="text"
              //value = { this.state.request.requester }
              ref={(input) => { this.fileRequester = input }}
              className="form-control"
              placeholder="Requester Address"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requesterPubKey"
              type="text"
              //value = { this.state.request.requester }
              ref={(input) => { this.requesterPubKey = input }}
              className="form-control"
              placeholder="Requester Public Key"
              required />
          </div>
          <p>&nbsp;</p>
          <input type='file' onChange={(event) => {
            event.preventDefault()
            this.captureFile(event)
          }} />
          <input type='submit' className="btn btn-primary"/>
        </form>
      </Modal>

      <h2 style={{ textAlign: 'center' }}>Pending Requests List</h2>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sender's Address</th>
              <th scope="col">File Name</th>
              <th scope="col">Sender's Public Key </th> 
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>          
            { this.state.requests.map((request, key) => {
              return(
                this.state.account !== request.fileOwner
                ? null
                : <tr key={key}>
                    <td>{request.requester}</td>
                    <td>{request.fileName}</td>
                    <td>{request.pubKey.slice(0,39)}</td>
                    <td><button className="btn btn-warning" onClick={() => {
                        this.openModal(request)
                      }}> Accept </button>
                    </td>
                  </tr>                            
            )})}                
          </tbody>
        </table>
      </div>              
    );
  }
}

export default PendingRequests;