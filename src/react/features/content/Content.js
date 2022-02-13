import React from 'react'
import PropTypes from 'prop-types'

import ContentView from './ContentView'

const Content = ({ diory }) => <ContentView diory={diory} />

Content.propTypes = {
  diory: PropTypes.shape({
    image: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.array,
  }).isRequired,
}

export default Content
