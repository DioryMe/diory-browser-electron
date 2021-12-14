import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'evergreen-ui'
import { useDispatch } from '../../../store'
import { createDiory } from '../../diograph/diographActions'

import Icon from '../../../components/Icon'

const CreateDioryButton = ({ text }) => {
  const dispatch = useDispatch()
  return (
    <Button
      appearance="primary"
      intent="success"
      margin={8}
      iconBefore={<Icon icon="plus" />}
      onClick={() => dispatch(createDiory({ text }))}
      data-testid="add-button"
    >
      {text}
    </Button>
  )
}

CreateDioryButton.propTypes = {
  text: PropTypes.string.isRequired,
}

export default CreateDioryButton
