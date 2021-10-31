import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import { Pane } from 'evergreen-ui'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

const defaultStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundImage: 'linear-gradient(rgba(50,50,50), rgba(50,50,50),rgba(0,0,0))',
}

const centerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const Pdf = ({ pdf, pageNumber, ...props }) => (
  <Box {...defaultStyle} {...props}>
    <Document file={pdf}>
      <Pane style={centerStyle}>
        <Page pageNumber={1} height={500} />
      </Pane>
    </Document>
  </Box>
)

Pdf.propTypes = {
  pdf: PropTypes.string.isRequired,
}

export default Pdf
