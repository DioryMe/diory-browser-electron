import React from 'react'
import FolderConnector from './folder/FolderConnector'
import IpfsConnector from './ipfs/IpfsConnector'

const Connectors = () => (
  <>
    <IpfsConnector />
    <FolderConnector />
  </>
)

export default Connectors
