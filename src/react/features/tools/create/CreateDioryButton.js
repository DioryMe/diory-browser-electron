import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

import { Button } from 'evergreen-ui'
import { useDispatch } from '../../../store'
import { createDiory } from '../../diograph/actions'

import Icon from '../../../components/Icon'

const useCreateDiory = () => {
  const dispatch = useDispatch()
  return (props) => {
    dispatch(createDiory({ ...props, id: uuid() }))
  }
}

const CreateDioryButton = ({ text }) => {
  const createDiory = useCreateDiory()
  return (
    <Button
      appearance="primary"
      intent="success"
      margin={8}
      iconBefore={<Icon icon="plus" />}
      onClick={() => createDiory({ text })}
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
