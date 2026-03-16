import React from 'react'
import { useSelector } from 'react-redux'

import { useReturnToHome } from '../home/useReturnToHome'

import { useOnDioryClick } from '../tools/useOnDioryClick'
import { useStoryContextDiories } from '../diograph/utils/useContextDiories'
import { useDiograph } from '../diograph/utils/useDiograph'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { NavigationBar } from './components/NavigationBar'
import { LensesButtons } from '../lenses/LensesButtons'
import { NavigationContent } from './components/NavigationContent'
import { MenuItem } from '../../components/menu/MenuItem'
import { DiographAddress } from '../diograph/components/DiographAddress'
import { useSidePanel } from '../sidePanel/useSidePanel'
import { NavigationDivider } from '../diograph/components/NavigationDivider'

const Navigation = ({ diograph }) => {
  const { rootKey } = useDiograph()

  const { storyKey } = useSelector((state) => state.navigation)
  const { story } = getStoryDiories(storyKey, diograph)

  const { context, stories, contexts } = useStoryContextDiories(diograph)

  const { showSidePanel, toggleSidePanel } = useSidePanel('left')

  return (
    <NavigationBar>
      <NavigationContent>
        <MenuItem
          diory={{ text: 'DIORY', key: rootKey }}
          fontWeight="bold"
          onClick={useOnDioryClick()}
        />
        <MenuItem
          diory={{ icon: showSidePanel ? 'star' : 'star-empty' }}
          onClick={toggleSidePanel}
        />
      </NavigationContent>
      <NavigationContent>
        {story && story.key === rootKey && (
          <>
            <MenuItem diory={{ text: 'Home' }} onClick={useReturnToHome()} />
            <NavigationDivider />
          </>
        )}
        <DiographAddress
          story={story}
          stories={stories}
          context={context}
          contexts={contexts}
          onClick={useOnDioryClick()}
        />
      </NavigationContent>
      <NavigationContent paddingRight={8}>
        <LensesButtons />
      </NavigationContent>
    </NavigationBar>
  )
}

export { Navigation }
