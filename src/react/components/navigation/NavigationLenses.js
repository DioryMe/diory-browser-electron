import React from 'react'
import { Pane, Tablist, Tab, Icon } from 'evergreen-ui'
import { useLenses } from '../lenses'

const useNavigationLenses = () => {
  const { lenses: { search, ...lenses }, selectedLensId, toggleLens } = useLenses()

  return {
    lenses: Object.values(lenses).map(lens => ({
      ...lens,
      isSelected: lens.id === selectedLensId,
      onSelect: () => toggleLens(lens.id),
    }))
  }
}

const NavigationLenses = props => {
  const { lenses } = useNavigationLenses()
  return (
    <Pane {...props}>
      <Tablist alignSelf="center">
        {lenses.map(({ diory, ...lens }) => (
          <Tab {...lens} alignSelf="center" aria-controls={`panel-${lens.id}`}>
            <Icon icon={diory.image} marginRight={4} />
            {diory.text}
          </Tab>
        ))}
      </Tablist>
    </Pane>
  )
}

export default NavigationLenses
