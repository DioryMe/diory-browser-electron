import React from 'react'
import { useSelector } from 'react-redux'

import { useReturnToHome } from '../home/useReturnToHome'

import { useOnDioryClick } from '../tools/useOnDioryClick'
import { useStoryContextDiories } from '../diograph/utils/useContextDiories'
import { useDiograph } from '../diograph/utils/useDiograph'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'
import { getDiory } from '../diograph/utils/getDiory'

import { NavigationBar } from './components/NavigationBar'
import { LensesButtons } from '../lenses/LensesButtons'
import { NavigationContent } from './components/NavigationContent'
import { MenuItem } from '../../components/menu/MenuItem'
import { DiographAddress, fallbackText } from '../diograph/components/DiographAddress'
import { NavigationDivider } from '../diograph/components/NavigationDivider'
import { useSidePanel } from '../sidePanel/useSidePanel'

const Navigation = ({ diograph }) => {
  const { rootKey } = useDiograph()
  const root = getDiory(rootKey, diograph)

  const { storyKey } = useSelector((state) => state.navigation)
  const { story } = getStoryDiories(storyKey, diograph)

  const { context, stories, contexts } = useStoryContextDiories(diograph)

  const { toggleSidePanel } = useSidePanel('left')

  const returnToHome = useReturnToHome()
  const onDioryClick = useOnDioryClick()

  return (
    <NavigationBar>
      <NavigationContent>
        <MenuItem diory={{ icon: 'menu' }} onClick={toggleSidePanel} />
        <MenuItem diory={{ text: 'DIORY' }} fontWeight="bold" onClick={returnToHome} />
        {root && (
          <>
            <NavigationDivider />
            <MenuItem diory={fallbackText(root)} onClick={onDioryClick} />
          </>
        )}
      </NavigationContent>
      <NavigationContent>
        <DiographAddress
          story={story}
          stories={stories}
          context={context}
          contexts={contexts}
          onClick={onDioryClick}
        />
      </NavigationContent>
      <NavigationContent paddingRight={8}>
        <LensesButtons />
      </NavigationContent>
    </NavigationBar>
  )
}

export { Navigation }
