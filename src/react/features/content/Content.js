import React from 'react'
import PropTypes from 'prop-types'

import ContentView from './ContentView'

const Content = ({ diory, style }) => <ContentView diory={diory} style={style} />

Content.propTypes = {
  diory: PropTypes.shape({
    image: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.array,
  }).isRequired,
  style: PropTypes.object,
}

export default Content
