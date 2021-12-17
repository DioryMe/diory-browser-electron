import { useSelector } from 'react-redux'

export { useDispatch } from 'react-redux'

export const useStore = (selector) => [useSelector(selector)]
