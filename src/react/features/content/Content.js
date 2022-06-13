import React from 'react'
import PropTypes from 'prop-types'

import ContentView from './ContentView'

const Content = ({ diory, contentUrl }) => <ContentView diory={diory} contentUrl={contentUrl} />

Content.propTypes = {
  diory: PropTypes.shape({
    image: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.array,
  }).isRequired,
  contentUrl: PropTypes.string,
}

export default Content
