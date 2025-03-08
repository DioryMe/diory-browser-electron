import { useSelector } from 'react-redux'

export const useNavigation = () => useSelector((state) => state.navigation)
