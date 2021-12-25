import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

import { Button } from 'evergreen-ui'
import { useDispatchActions } from '../../../store'
import { createDiory } from '../../diograph/diographActions'

import Icon from '../../../components/Icon'

const CreateDioryButton = ({ text }) => {
  const { dispatch } = useDispatchActions()
  return (
    <Button
      appearance="primary"
      intent="success"
      margin={8}
      iconBefore={<Icon icon="plus" />}
      onClick={() => {
        const id = uuid()
        dispatch(createDiory({ id, text }))
      }}
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
