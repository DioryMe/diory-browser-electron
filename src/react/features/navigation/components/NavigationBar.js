import React from 'react'
import { Pane } from 'evergreen-ui'
import { useStore, useDispatchActions } from '../../../store'
import { toggleSearchBar } from '../../search/actions'

import NavigationButtons from './NavigationButtons'
import NavigationLenses from './NavigationLenses'
// import TextFilter from '../../filters/text/TextFilter'
import Icon from '../../../components/Icon'

const NavigationBar = () => {
  const [{ roomId }] = useStore((state) => state.navigation)
  const [{ active }] = useStore((state) => state.search)
  const { dispatch } = useDispatchActions()

  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      padding={8}
      background="tint2"
      zIndex={15}
      position="fixed"
      width="100%"
    >
      <NavigationButtons display="flex" alignSelf="center" />
      <NavigationLenses display="flex" />
      {roomId && (
        <Pane>
          {/* A icon is only a svg element and should not have onClick handlers.
          If you need a clickable icon, use IconButton instead. */}
          <Icon size={20} icon="filter" marginRight="24px" style={{ cursor: 'hand' }} />
          <Icon
            size={20}
            icon="search"
            marginRight="24px"
            color={active ? 'selected' : ''}
            style={{ cursor: 'hand' }}
            onClick={() => dispatch(toggleSearchBar())}
          />
          <Icon size={20} icon="cog" marginRight="24px" style={{ cursor: 'hand' }} />
        </Pane>
      )}
      {/* roomId && <TextFilter /> */}
    </Pane>
  )
}

export default NavigationBar
