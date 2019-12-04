import React from 'react'
import PropTypes from 'prop-types'
import { Pane, IconButton, SearchInput, Tablist, Tab, Icon } from 'evergreen-ui'

const NavBar = ({
  back,
  forward,
  lenses: { search, ...lenses } = {},
  create
}) => (
  <Pane display="flex" justifyContent="space-between" padding={8} background="tint2">
    <Pane display="flex" alignSelf="center">
      <IconButton appearance="minimal" icon="arrow-left" {...back}/>
      <IconButton appearance="minimal" icon="arrow-right" {...forward}/>
    </Pane>
    <Pane display="flex">
      <SearchInput marginRight={16} width={150} {...search}/>
      <Tablist alignSelf="center">
        {Object.values(lenses).map(({ diory, ...lens }) => (
          <Tab
            {...lens}
            key={diory.id}
            alignSelf="center"
            aria-controls={`panel-${diory.id}`}
          >
            <Icon icon={diory.data.icon} marginRight={4}/>
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

NavBar.defaultProps = {}

NavBar.propTypes = {
  lenses: PropTypes.array,
  search: PropTypes.object,
}

export default NavBar
