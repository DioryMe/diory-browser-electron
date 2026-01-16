import React from 'react'
import { useSelector } from 'react-redux'

import { useGraphData } from './utils/useGraphData'

import { useSelectStory } from '../../tools/selectStory'
import { useSelectDiory } from '../../tools/utils/useSelectDiory'

import GraphView from './components/GraphView'

export const graphLensButton = {
  id: 'graph',
  text: 'Graph',
  icon: 'graph',
}

export const GraphLens = ({ diograph }) => {
  const { storyKey } = useSelector((state) => state.navigation)
  const { sidePanelWidths } = useSelector((state) => state.sidePanel)

  const graphData = useGraphData(diograph)
  const storyNode = graphData.nodes.find(({ id }) => id === storyKey)

  return (
    <GraphView
      storyNode={storyNode}
      data={graphData}
      onDioryClick={useSelectStory()}
      onSelect={useSelectDiory()}
      sidePanelWidth={sidePanelWidths.right}
    />
  )
}
