import React from 'react'
import PropTypes from 'prop-types'

import { HomeWelcome } from './components/HomeWelcome'
import { HomeAddressButton } from './components/HomeAddressButton'

export const HomeView = ({ showChildren, showButton, children, onButtonClick }) => {
  return showChildren ? (
    children
  ) : (
    <HomeWelcome>
      {showButton && <HomeAddressButton onClick={onButtonClick} />}
    </HomeWelcome>
  )
}

HomeView.propTypes = {
  showChildren: PropTypes.bool.isRequired,
  showButton: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onButtonClick: PropTypes.func.isRequired,
}
