const SendRequest = artifacts.require('./SendRequest.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('SendRequest', ([deployer, author, sender]) => {
  let sendRequest

  before(async () => {
    sendRequest = await SendRequest.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await sendRequest.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

  })

  describe('requests', async () => {
    let result, requestCount

    before(async () => {
      result = await sendRequest.sendRequest('This is my first request', author, 'public Key',{ from: sender })
      requestCount = await sendRequest.requestCount()
    })

    it('lists requests', async () => {
      const request = await sendRequest.requests(requestCount)
      assert.equal(request.id.toNumber(), requestCount.toNumber(), 'id is correct')
      assert.equal(request.fileName, 'This is my first request', 'Hash is correct')
      assert.equal(request.fileOwner, author, 'author is correct')
      assert.equal(request.pubKey, 'public Key', 'public Key is correct')
      assert.equal(request.requester, sender, 'sender is correct')

      await sendRequest.sendRequest('', { from: sender }).should.be.rejected;
    })

  })

})