import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Pane } from 'evergreen-ui'

import Fullscreen from '../../components/Fullscreen'
import SetHomeRoomButton from './SetHomeButton'

const HomeView = ({ initializing }) => (
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
      {!initializing && <SetHomeRoomButton />}
    </Pane>
  </Fullscreen>
)

HomeView.propTypes = {
  initializing: PropTypes.bool,
}

export default HomeView
