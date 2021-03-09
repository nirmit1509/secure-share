import React, { Component } from 'react';

class MyUploads extends Component {

    async componentWillMount() {
        await this.loadBlockchainData()
        console.log('MyUploads state', this.state)
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
      }

  render() {
    return (
        <div className="col-md-6" style={{ maxWidth: '95%' }}> 
            <p>&nbsp;</p>
            <h2 style={{ textAlign: 'center' }}>My Uploads</h2>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">File IPFS Hash Key</th>
                        <th scope="col">Requester</th>
                        <th scope="col">Author</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.reports.map((report, key) => {
                        return(
                            this.state.account !== report.author
                            ? null
                            : <tr key={key}>
                                <td>{report.ipfsHash.slice(0,24)}</td>
                                <td>{report.requester}</td>
                                <td>{report.author}</td>
                            </tr>
                        ) 
                    })}
                </tbody>
            </table>  
        </div>
    );
  }
}

export default MyUploads;