import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from 'evergreen-ui'
import Icon from './Icon'

const LensButton = ({ diory, isSelected, onSelect, ...lens }) => (
  <Tab
    {...lens}
    onSelect={onSelect}
    isSelected={isSelected}
    style={{ verticalAlign: 'middle' }}
    borderRadius="16px"
    alignSelf="center"
    padding={12}
    marginRight={8}
    cursor="pointer"
    aria-controls={`panel-${lens.id}`}
    data-testid={`${lens.id}-lens`}
  >
    <Icon icon={diory.image} marginRight={8} size={16} />
    {diory.text}
  </Tab>
)

LensButton.propTypes = {
  diory: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default LensButton
