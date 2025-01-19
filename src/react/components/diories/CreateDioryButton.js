import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'evergreen-ui'

import Icon from '../Icon'

const buttonStyles = {
  borderRadius: 0,
  whiteSpace: 'normal',
  lineHeight: 1.2,
}

const CreateDioryButton = ({ text, onClick }) => (
  <Button
    appearance="primary"
    intent="success"
    iconBefore={<Icon icon="plus" />}
    onClick={() => onClick({ text })}
    data-testid="add-button"
    {...buttonStyles}
  >
    {text}
  </Button>
)

CreateDioryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CreateDioryButton
