import Web3 from 'web3'

const ethereum = new Web3(window.ethereum)
window.ethereum.enable()

export default ethereum
