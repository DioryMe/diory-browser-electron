import { useCallback, useEffect, useState } from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { buttons, NEXT_BUTTON, PREVIOUS_BUTTON } from './buttons'

import { addButtons, inactivateButton, removeButtons } from '../../buttons/buttonsActions'

const useAddAndRemoveButtons = (pageRef) => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (pageRef) {
      dispatch(addButtons(Object.values(buttons)))
    } else {
      dispatch(removeButtons(Object.values(buttons)))
    }
  }, [dispatch, pageRef])
}

const usePageNumber = () => {
  const { active } = useSelector((state) => state.buttons)
  const [page, setPage] = useState(1)

  const next = active === NEXT_BUTTON
  const previous = active === PREVIOUS_BUTTON

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (next) {
      setPage((page) => page + 1)
      dispatch(inactivateButton())
    }
    if (previous) {
      setPage((page) => page - 1)
      dispatch(inactivateButton())
    }
  }, [dispatch, next, previous])

  return page
}

export const usePageTool = () => {
  const [pageElement, setPlayElement] = useState(null)
  const pageRef = useCallback((node) => {
    setPlayElement(node)
  }, [])

  useAddAndRemoveButtons(pageElement)

  return {
    number: usePageNumber(),
    ref: pageRef,
  }
}
