import React from 'react'
import { v4 as uuid } from 'uuid'

import { Button } from 'evergreen-ui'
import { useDispatch, useStore } from '../../store'
import { createDiory } from '../diograph/actions'

import Icon from '../../components/Icon'

const useCreateDiory = () => {
  const dispatch = useDispatch()
  return (props) => {
    dispatch(createDiory({ ...props, id: uuid() }))
  }
}

const SearchCreateDioryButton = () => {
  const [{ query }] = useStore((state) => state.search)
  const createDiory = useCreateDiory()
  return query ? (
    <Button
      appearance="primary"
      intent="success"
      margin={8}
      iconBefore={<Icon icon="plus" />}
      onClick={() => createDiory({ text: query })}
      data-testid="add-button"
    >
      {query}
    </Button>
  ) : null
}

export default SearchCreateDioryButton
