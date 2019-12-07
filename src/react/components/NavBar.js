import React from 'react'
import { Pane, IconButton, SearchInput, Tablist, Tab, Icon } from 'evergreen-ui'

import { useLenses } from './lenses'

const useNavBarLenses = () => {
  const {
    search,
    selectLens,
    ...lenses
  } = useLenses()

  const { id, key, text, image } = search
  return {
    lenses,
    search: {
      id,
      key,
      text,
      image,
      placeholder: 'Search diories...',
      onFocus: () => selectLens(id),
    },
  }
}

const NavBar = ({
  back,
  forward,
  create,
}) => {
  const { search, lenses } = useNavBarLenses()
  return (
    <Pane display="flex" justifyContent="space-between" padding={8} background="tint2">
      <Pane display="flex" alignSelf="center">
        <IconButton appearance="minimal" icon="arrow-left" {...back}/>
        <IconButton appearance="minimal" icon="arrow-right" {...forward}/>
      </Pane>
      <Pane display="flex">
        <SearchInput marginRight={16} width={150} {...search}/>
        <Tablist alignSelf="center">
          {Object.values(lenses).map(({diory, ...lens}) => (
            <Tab
              {...lens}
              alignSelf="center"
              aria-controls={`panel-${lens.id}`}
            >
              <Icon icon={diory.image} marginRight={4}/>
              {diory.text}
            </Tab>
          ))}
        </Tablist>
      </Pane>
      <Pane>
        <IconButton appearance="minimal" icon="plus" {...create}/>
      </Pane>
    </Pane>
  )
}

export default NavBar
