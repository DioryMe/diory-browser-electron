import React from 'react'
import ConnectorBar from '../../components/ConnectorBar'
import FolderConnector from './folder/FolderConnector'
import IpfsConnector from './ipfs/IpfsConnector'

const Connectors = () => (
  <ConnectorBar>
    <FolderConnector />
    <IpfsConnector />
  </ConnectorBar>
)

export default Connectors
