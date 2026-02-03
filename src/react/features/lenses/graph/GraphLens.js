import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useGraphData } from './utils/useGraphData'

import { useOnDioryClick } from '../../tools/useOnDioryClick'
import { useOnCheckboxClick } from '../../tools/useOnCheckboxClick'

import GraphView from './components/GraphView'

export const graphLensButton = {
  id: 'graph',
  text: 'Graph',
  icon: 'graph',
}

const GraphLens = ({ diograph }) => {
  const { storyKey } = useSelector((state) => state.navigation)
  const { sidePanelWidths } = useSelector((state) => state.sidePanel)

  const graphData = useGraphData(diograph)
  const storyNode = graphData.nodes.find(({ id }) => id === storyKey)

  return (
    <GraphView
      storyNode={storyNode}
      data={graphData}
      onDioryClick={useOnDioryClick()}
      onSelect={useOnCheckboxClick({ diograph })}
      sidePanelWidth={sidePanelWidths.right}
    />
  )
}

GraphLens.propTypes = {
  diograph: PropTypes.object,
}

export { GraphLens }
