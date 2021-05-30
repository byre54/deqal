import React, { useState, useEffect, fetch } from 'react'
import { useLocation } from 'react-router-dom'
import { ipfs as infuraIPFS } from './web3/infura'

export default function ProfileGet () {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const lokasi = useLocation()
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    // prepare the request
    const alias = lokasi.pathname.slice(1)
    const ipfsFolder = 'bafybeihofntiighw777npky6dj6d6y7osgbxydw6l2bwkwz7tk2o5dkesu'
    const hashAddress = ipfsFolder + '/' + alias + '.txt'
    infuraIPFS.get(hashAddress).then(
      response => {
        setIsLoaded(true)
        console.log(response.data)
        const fileContent = response.data.toString()
        const splittedContent = fileContent.split(alias + '.txt')
        const theContent = splittedContent[1].slice(504).trim()
        setItems(theContent)
        console.log(theContent.length)
      })
      .catch(
        error => {
          setIsLoaded(true)
          // setError(error)
          if (error.response) {
            console.log('error')
            setItems('No Profile found, wanna claim it ?  ')
            // console.log(error.response.data)
          }
        }
      )
      .then(function (result) {
      })
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <h1> {lokasi.pathname}</h1>
        <h6> {items}</h6>
      </div>
    )
  }
}
