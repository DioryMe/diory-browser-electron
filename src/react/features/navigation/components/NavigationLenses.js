import React from 'react'
import { Pane, Tablist, Tab, Icon } from 'evergreen-ui'
import { useStore } from '../../../store'
import { useLenses } from '../../lenses/hooks'

const useNavigationLenses = () => {
  const {
    lenses: { search, ...lenses },
    selectedLensId,
    toggleLens,
  } = useLenses()
  const [{ roomId }] = useStore((state) => state.navigation)

  return {
    lenses:
      roomId &&
      Object.values(lenses).map((lens) => ({
        ...lens,
        isSelected: lens.id === selectedLensId,
        onSelect: () => toggleLens(lens.id),
      })),
  }
}

const NavigationLenses = (props) => {
  const { lenses } = useNavigationLenses()
  return !lenses ? null : (
    <Pane {...props}>
      <Tablist alignSelf="center">
        {lenses.map(({ diory, ...lens }) => (
          <Tab {...lens} alignSelf="center" aria-controls={`panel-${lens.id}`} data-testid={`${lens.id}-lens`}>
            <Icon icon={diory.image} marginRight={4} />
            {diory.text}
          </Tab>
        ))}
      </Tablist>
    </Pane>
  )
}

export default NavigationLenses
