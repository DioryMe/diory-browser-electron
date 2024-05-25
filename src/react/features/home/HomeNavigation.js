import React from 'react'

import NavigationButton from '../../components/NavigationButton'

const useHomeButton = () => ({
  text: 'DIORY',
  onClick: () => console.log('Diory home'),
  fontWeight: 'bold',
})

const HomeNavigation = () => {
  const button = useHomeButton()
  return <NavigationButton {...button} />
}
export default HomeNavigation
