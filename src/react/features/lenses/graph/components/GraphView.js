import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ForceGraph3D from 'react-force-graph-3d'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'

const getNodeThreeObject = (node) => {
  const imageParameters = { map: new THREE.TextureLoader().load(node.image) }
  const imageMaterial = new THREE.SpriteMaterial(imageParameters)
  const imageSprite = new THREE.Sprite(imageMaterial)
  if (node.path === '/') {
    imageSprite.scale.set(45, 30)
  } else {
    imageSprite.scale.set(15, 10)
  }

  imageSprite.add(new SpriteText(node.text, 0.1))

  return imageSprite
}

const getLinkThreeObject = () => {
  const material = new THREE.LineBasicMaterial({ color: 0xffffff })
  const geometry = new THREE.BufferGeometry()
  return new THREE.Line(geometry, material)
}

const useLinkDistance = (ref) => {
  useEffect(() => {
    ref.current.d3Force('link').distance((link) => {
      if (link.source.path === '/') {
        return 40
      }
      if (link.target.links) {
        return Object.keys(link.target.links).length * 10
      }
      return 10
    })
  }, [ref])
}

const useDisplay = (sidePanelWidth) => {
  const width = (sidePanelWidth * window.innerWidth) / 100
  const height = window.innerHeight

  const [displayWidth, setDisplayWidth] = useState(width)
  const [displayHeight, setDisplayHeight] = useState(height)

  useEffect(() => {
    setDisplayWidth(width)
  }, [width, height])

  window.addEventListener('resize', () => {
    setDisplayWidth(width)
    setDisplayHeight(height)
  })

  return {
    displayWidth,
    displayHeight,
  }
}

const setStoryNodeToFocus = (fgRef, storyNode) => {
  const distance = 80
  const distRatio = 1 + distance / Math.hypot(storyNode.x, storyNode.y, storyNode.z)

  fgRef.current.cameraPosition(
    { x: storyNode.x * distRatio, y: storyNode.y * distRatio, z: storyNode.z * distRatio }, // new position
    storyNode, // lookAt ({ x, y, z })
    1000 // ms transition duration
  )
}

const useFocusToStoryNode = (fgRef, storyNode) => {
  useEffect(() => {
    if (fgRef.current && storyNode) {
      setTimeout(() => {
        setStoryNodeToFocus(fgRef, storyNode)
      }, 100)
    }
  }, [fgRef, storyNode])
}

// TODO selected diory
// - larger size
// - larger link distance

const GraphView = ({ storyNode, data, onDioryClick, sidePanelWidth }) => {
  const fgRef = useRef()

  useLinkDistance(fgRef)
  useFocusToStoryNode(fgRef, storyNode)

  const { displayHeight, displayWidth } = useDisplay(sidePanelWidth)
  return (
    <ForceGraph3D
      ref={fgRef}
      width={displayWidth}
      height={displayHeight}
      showNavInfo={false}
      backgroundColor="#222222"
      graphData={data}
      nodeLabel="text"
      nodeThreeObject={getNodeThreeObject}
      linkThreeObject={getLinkThreeObject}
      linkOpacity={1}
      linkWidth="10px"
      linkColor="#FFFFFF"
      linkDirectionalArrowLength={2}
      linkDirectionalArrowColor="#FFFFFF"
      linkCurvature={0.3}
      warmupTicks={200}
      onNodeClick={(diory) => onDioryClick({ diory })}
      onNodeDragEnd={(node) => {
        node.fx = node.x // eslint-disable-line no-param-reassign
        node.fy = node.y // eslint-disable-line no-param-reassign
        node.fz = node.z // eslint-disable-line no-param-reassign
      }}
      onEngineStop={() => setStoryNodeToFocus(fgRef, storyNode)}
    />
  )
}

GraphView.propTypes = {
  storyNode: PropTypes.object,
  data: PropTypes.object.isRequired,
  onDioryClick: PropTypes.func.isRequired,
  sidePanelWidth: PropTypes.number,
}

export default GraphView
