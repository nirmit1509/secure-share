import React, { Component } from 'react';
const secp256k1 = require('secp256k1')
const ethJsUtil = require('ethereumjs-util');
const Transaction = require('ethereumjs-tx').Transaction;

class RequestFile extends Component {

    async componentWillMount() {
        console.log('RequestFile state', this.state)
    }

    // async findPublicKey(txHash, web3) {
    //   const trx = await web3.eth.getTransaction(txHash);
    //   console.log(trx);
    //   const signature = Buffer.concat([Buffer.from(trx.r, "hex").slice(0,31), Buffer.from(trx.s, "hex").slice(0,31)], 64)
    //   const recovery = trx.v - 27;
    //   const msgHash = Buffer.from(trx.hash, "hex")
    //   const senderPubKey = secp256k1.recover(msgHash, signature, recovery);
    //   console.log(secp256k1.publicKeyConvert(senderPubKey, false).slice(1))
    // }

    requestFile(name, author, publicKey) {
        this.setState({ loading: true });
        this.state.sendRequestContract.methods.sendRequest(name, author, publicKey)
        .send({ from: this.state.account },
          (error, transactionHash) => { 
            console.log(transactionHash);
            // this.findPublicKey(transactionHash, this.state.web3);   
            // console.log('called');
          })
        .once('receipt', (receipt) => {
          this.setState({ loading: false });
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: this.props.state.account,
            web3: this.props.state.web3,
            networkId : this.props.state.networkId,
            sendRequestContract: this.props.state.sendRequestContract,
            encryptIPFSContract: this.props.state.encryptIPFSContract,
            loading: this.props.state.loading
          }
        this.requestFile = this.requestFile.bind(this)
        //this.findPublicKey = this.findPublicKey.bind(this)
    }
    

  render() {
    return (
        <div className="col-md-3 offset-4" style={{ maxWidth: '500px' }}> 
            <p>&nbsp;</p>
            <h2>Request File From Author</h2>
            <br />
            <form onSubmit={(event) => {
                    event.preventDefault()
                    const name = this.fileName.value
                    const author = this.fileAuthor.value
                    const publicKey = this.publicKey.value
                    this.requestFile(name, author, publicKey)
                }}>    
                <div className="form-group mr-sm-2">
                    <input
                    id="fileName"
                    type="text"
                    ref={(input) => { this.fileName = input }}
                    className="form-control"
                    placeholder="Name of requested file"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                    <input
                    id="fileAuthor"
                    type="text"
                    ref={(input) => { this.fileAuthor = input }}
                    className="form-control"
                    placeholder="Author Address"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                    <input
                    id="publicKey"
                    type="text"
                    ref={(input) => { this.publicKey = input }}
                    className="form-control"
                    placeholder="Your Public Key"
                    required />
                </div>
                <button type="submit" className="btn btn-primary">Send Request</button>
            </form>
            <p>&nbsp;</p> 
        </div>              
    );
  }
}

export default RequestFile;