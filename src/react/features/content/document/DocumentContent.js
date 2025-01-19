import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

import { usePageButtons } from '../../buttons/utils/usePageButtons'
import { useOpenFolderButton } from '../../buttons/utils/useOpenFolderButton'

const centerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const DocumentContent = ({ url }) => {
  useOpenFolderButton(url)
  const { pageNumber, setNumberOfPages } = usePageButtons()

  return (
    <Document file={url} onLoadSuccess={({ numPages }) => setNumberOfPages(numPages)}>
      <Pane style={centerStyle} data-testid="document-content">
        <Page pageNumber={pageNumber} height={500} />
      </Pane>
    </Document>
  )
}

DocumentContent.propTypes = {
  url: PropTypes.string,
}

export default DocumentContent
