import React from 'react'
import PropTypes from 'prop-types'
import Fullscreen from '../../components/Fullscreen'

const SettingsBar = ({ children, ...props }) => (
  <Fullscreen
    background="#fcd600"
    display="flex"
    flexDirection="column"
    width={300}
    padding={16}
    {...props}
  >
    {children}
  </Fullscreen>
)

SettingsBar.propTypes = {
  children: PropTypes.node,
}

export default SettingsBar
