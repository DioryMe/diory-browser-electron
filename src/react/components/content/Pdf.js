import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

const centerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const Pdf = ({ page = {}, pdf, ...props }) => {
  const [{ numPages }, setPages] = useState({ numPages: 1 })
  const pageNumber = Math.max(0, Math.min(numPages, page.number))
  return (
    <Document file={pdf} onLoadSuccess={setPages}>
      <Pane style={centerStyle}>
        <Page pageNumber={pageNumber} height={500} />
      </Pane>
    </Document>
  )
}

Pdf.propTypes = {
  page: PropTypes.shape({
    ref: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  pdf: PropTypes.string.isRequired,
}

export default Pdf
