import { useEffect, useState } from 'react'
import { useDispatchActions, useSelector } from '../../store'
import { addButtons, inactivateButton, removeButtons } from './buttonsActions'

export const NEXT_BUTTON = 'NEXT_BUTTON'
export const PREVIOUS_BUTTON = 'PREVIOUS_BUTTON'

const buttons = [
  {
    id: NEXT_BUTTON,
    text: 'Next',
    data: {
      type: 'content',
      icon: 'chevron-right',
      testid: 'next',
      visible: true,
    },
  },
  {
    id: PREVIOUS_BUTTON,
    text: 'Previous',
    data: {
      type: 'content',
      icon: 'chevron-left',
      testid: 'previous',
      visible: true,
    },
  },
]

export const usePageButton = (button, isLastPage, nextPage, setPageNumber) => {
  const { active, buttons } = useSelector((state) => state.buttons)

  const buttonExists = !!buttons[button.id]

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (!isLastPage && !buttonExists) {
      dispatch(addButtons([button]))
    }
    if (isLastPage && buttonExists) {
      dispatch(removeButtons([button]))
    }
  }, [dispatch, isLastPage, buttonExists, button])

  const action = active === button.id
  useEffect(() => {
    if (action) {
      setPageNumber(() => nextPage)
      dispatch(inactivateButton())
    }
  }, [dispatch, action, nextPage])

  useEffect(() => {
    return () => dispatch(removeButtons([button]))
  }, [button])
}

export const usePageNumber = ([nextButton, previousButton], numberOfPages) => {
  const [pageNumber, setPageNumber] = useState(1)

  const isLastPage = pageNumber === numberOfPages
  const nextPage = Math.min(numberOfPages, pageNumber + 1)
  usePageButton(nextButton, isLastPage, nextPage, setPageNumber)

  const isFirstPage = pageNumber === 1
  const previousPage = Math.max(1, pageNumber - 1)
  usePageButton(previousButton, isFirstPage, previousPage, setPageNumber)

  return {
    pageNumber,
  }
}

export const usePageButtons = () => {
  const [numberOfPages, setNumberOfPages] = useState(1)
  const { pageNumber } = usePageNumber(buttons, numberOfPages)
  return { pageNumber, setNumberOfPages }
}
