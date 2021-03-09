import React, { Component } from 'react';
import Modal from 'react-modal';
import "../css/Modal-style.css";
const ecies = require("eth-ecies");

class SharedWithMe extends Component {
    async componentWillMount() {
        await this.loadBlockchainData()
        console.log('SharedWithMe state', this.state)
      }
    
    async loadBlockchainData() {
        const encryptIPFSContract = this.state.encryptIPFSContract
        const reportCount = await encryptIPFSContract.methods.reportCount().call()
        this.setState({ reportCount })
        for (var i = 1; i <= reportCount; i++) {
            const report = await encryptIPFSContract.methods.reports(i).call()
            this.setState({ reports: [...this.state.reports, report] })
        }
        this.setState({ loading: false})
    }  
    
    constructor(props) {
        super(props)
        this.state = {
            account: this.props.state.account,
            web3: this.props.state.web3,
            networkId : this.props.state.networkId,
            sendRequestContract: this.props.state.sendRequestContract,
            encryptIPFSContract: this.props.state.encryptIPFSContract,
            reportCount: 0,
            reports: [],
            loading: this.props.state.loading
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.viewFile = this.viewFile.bind(this)
    }

    viewFile(privateKey, ipfsHash) {
        const decryptedHash = ecies.decrypt(Buffer.from(privateKey, "hex"), Buffer.from(ipfsHash, "hex"));
        if(!decryptedHash) {
            window.alert("Invalid Private Key")
        }
        const ipfs_hash = decryptedHash.toString();
        var url = `https://ipfs.io/ipfs/${ipfs_hash}`
        window.open(url, '_blank')
    };

    openModal() { this.setState({ showModal : true }); }
    closeModal() { this.setState({ showModal : false }); }

  render() {
    return (
        <div className="col-md-6" style={{ maxWidth: '90%' }}> 
            <p>&nbsp;</p>
            <Modal isOpen={this.state.showModal} className="viewFileModal" onRequestClose={this.closeModal} >
                <h2 style={{ textAlign: 'center' }}>View File</h2><br />
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const privateKey = this.privateKey.value
                    const ipfsHash = this.ipfsHash.value
                    this.viewFile(privateKey, ipfsHash)
                }}>
                <div className="form-group mr-sm-2">
                    <input
                    id="ipfsHash"
                    type="text"
                    ref={(input) => { this.ipfsHash = input }}
                    className="form-control"
                    placeholder="Enter encrypted hash"
                    required />
                </div>    
                <div className="form-group mr-sm-2">
                    <input
                    id="privateKey"
                    type="text"
                    ref={(input) => { this.privateKey = input }}
                    className="form-control"
                    placeholder="Enter your private key here"
                    required />
                </div>
                <br />
                <input type='submit' value="View" className="btn btn-primary"/>
                </form>
            </Modal>
            <h2 style={{ textAlign: 'center' }}>Shared With Me</h2>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">File IPFS Hash Key</th>
                        <th scope="col">Author</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.reports.map((report, key) => {
                        return(
                            this.state.account !== report.requester
                            ? null
                            : <tr key={key}>
                                <td>{report.ipfsHash.slice(0,39)}</td>
                                <td>{report.author}</td>
                                <td><button className="btn btn-primary" onClick={() => this.openModal()}> View </button></td>
                                        {/* {onClick={(event) => {
                                        // var url = `https://ipfs.io/ipfs/${report.ipfsHash}`
                                        // window.open(url, '_blank')
                                        // }} */}                                
                            </tr>
                        ) 
                    })}
                </tbody>
            </table>  
        </div>
    );
  }
}
export default SharedWithMe;