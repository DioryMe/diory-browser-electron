import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from 'evergreen-ui'

import { useModal } from './useModal'

import Icon from '../../components/Icon'

const ModalNavigation = ({ side }) => {
  const { showModal, toggleModal } = useModal(side)
  const closeIcon = side === 'left' ? 'right' : 'left'
  const icon = showModal ? side : closeIcon
  return (
    <IconButton
      appearance="minimal"
      icon={<Icon icon={`chevron-${icon}`} size={24} />}
      onClick={toggleModal}
      data-testid="toggleModal"
    />
  )
}

ModalNavigation.propTypes = {
  side: PropTypes.string,
}

export default ModalNavigation
