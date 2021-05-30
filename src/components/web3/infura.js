import axios from 'axios'
// ETH CONF

// IPFS CONF
const ipfsGW = 'https://ipfs.infura.io:5001'
const apiver = 'api/v0'
const params = 'archive=false'

export const ipfs = {
  get: (hashAddress) => {
    const request = ipfsGW + '/' + apiver + '/get?' + params + '&arg=' + hashAddress
    return axios.get(request)
  },
  put: (hashAddress) => {
    const a = 1
    return a
  }
}

export const eth = {
  sign: (hashAddress) => {
    const a = 1
    return a
  },
  solve: (hashAddress) => {
    const a = 1
    return a
  }
}
