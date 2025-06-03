import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Pane } from 'evergreen-ui'

import Fullscreen from '../../components/Fullscreen'
import HomeButton from './HomeButton'

const HomeView = ({ initializing, onClick }) => (
  <Fullscreen
    background="#fcd600"
    display="flex"
    alignItems="center"
    justifyContent="center"
    zIndex={100}
  >
    <Pane
      height={100}
      display="flex"
      alignItems="top"
      justifyContent="center"
      flexWrap="wrap"
      textAlign="center"
    >
      <Heading size={900} width="100%">
        Welcome to Diory!
      </Heading>
      {!initializing && <HomeButton onClick={onClick} />}
    </Pane>
  </Fullscreen>
)

HomeView.propTypes = {
  initializing: PropTypes.bool,
  onClick: PropTypes.func,
}

export default HomeView
