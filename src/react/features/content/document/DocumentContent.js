import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

import { usePageButtons } from '../../buttons/usePageButtons'
import { getContentUrl } from '../contentUtils'
import { useOpenFolderButton } from '../../buttons/useOpenFolderButton'

const centerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const DocumentContent = ({ diory, baseUrl }) => {
  const documentUrl = getContentUrl(diory, baseUrl)
  useOpenFolderButton(documentUrl)
  const { pageNumber, setNumberOfPages } = usePageButtons()

  return (
    <Document file={documentUrl} onLoadSuccess={({ numPages }) => setNumberOfPages(numPages)}>
      <Pane style={centerStyle} data-testid="document-content">
        <Page pageNumber={pageNumber} height={500} />
      </Pane>
    </Document>
  )
}

DocumentContent.propTypes = {
  diory: PropTypes.object,
  baseUrl: PropTypes.string,
}

export default DocumentContent
