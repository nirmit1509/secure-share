pragma solidity ^0.5.0;

contract SendRequest {
  uint public requestCount = 0;
  struct Request {
        uint id;
        string fileName;
        address fileOwner;
        string pubKey;
        address requester;
    }
  mapping(uint => Request) public requests;
  event RequestSent(
        uint id,
        string fileName,
        address fileOwner,
        string pubKey,
        address requester
    );
  function sendRequest(string memory _fileName, address _fileOwner, string memory _pubKey) public {
      require(bytes(_fileName).length > 0, "File name required");
      require(_fileOwner!=msg.sender, "Author of file cannot be same as requester");
      requestCount ++;
      requests[requestCount] = Request(requestCount, _fileName, _fileOwner, _pubKey, msg.sender);
      emit RequestSent(requestCount, _fileName, _fileOwner, _pubKey, msg.sender);
  }
}