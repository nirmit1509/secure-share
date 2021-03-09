pragma solidity ^0.5.0;

contract EncryptIPFS {
  uint public reportCount = 0;
  struct Report {
        uint id;
        string ipfsHash;
        address author;
        address requester;
    }
  mapping(uint => Report) public reports;
  event ReportUploaded(
        uint id,
        string ipfsHash,
        address author,
        address requester
    );
  function uploadReport(string memory _ipfsHash, address _requester) public {
      require(bytes(_ipfsHash).length > 0, "Empty hash not allowed");
      reportCount ++;
      reports[reportCount] = Report(reportCount, _ipfsHash, msg.sender, _requester);
      emit ReportUploaded(reportCount, _ipfsHash, msg.sender, _requester);
  }
}