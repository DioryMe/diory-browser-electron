import React from 'react'
import PropTypes from 'prop-types'
import * as Icons from 'evergreen-ui'

function getIconComponentName(iconString) {
  return iconString
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

const Icon = ({ icon, ...props }) => {
  const iconName = `${getIconComponentName(icon)}Icon`
  const IconComponent = Icons[iconName]
  if (IconComponent) {
    return <IconComponent {...props} />
  }

  console.error('Missing icon', iconName)
  return <Icons.ErrorIcon {...props} />
}

Icon.defaultProps = {
  icon: 'error-icon',
}

Icon.propTypes = {
  icon: PropTypes.string,
}

export default Icon
