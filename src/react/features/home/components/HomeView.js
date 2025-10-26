import React from 'react'
import PropTypes from 'prop-types'

import { HomeWelcome } from './HomeWelcome'
import { HomeAddressButton } from './HomeAddressButton'

export const HomeView = ({ showChildren, showButton, children, onButtonClick }) =>
  showChildren ? (
    children
  ) : (
    <HomeWelcome>{showButton && <HomeAddressButton onClick={onButtonClick} />}</HomeWelcome>
  )

HomeView.propTypes = {
  showChildren: PropTypes.bool.isRequired,
  showButton: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onButtonClick: PropTypes.func.isRequired,
}
