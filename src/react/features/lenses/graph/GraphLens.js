import React from 'react'
import { useSelector } from 'react-redux'

import { useSelectStory } from '../../tools/selectStory'
import { useSelectDiory } from '../../tools/useSelectDiory'
import { useGraphData } from './useGraphData'

import GraphView from './GraphView'

import graphLensButton from './button'
export { graphLensButton }

export const GraphLens = () => {
  const { diograph } = useSelector((state) => state.diograph)
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
