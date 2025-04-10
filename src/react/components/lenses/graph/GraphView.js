import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ForceGraph3D from 'react-force-graph-3d'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'
import Fullscreen from '../../Fullscreen'
import { getDiory } from '../../../features/diograph/utils/getDiory'
import { getDiographKey } from '../../../features/diograph/utils/getDiographKey'
import { getDefaultImage } from '../../../../shared/getDefaultImage'

const mapDiographToData = (diograph) => {
  const links = []
  Object.entries(diograph).forEach(([dioryKey, diory]) => {
    if (diory.links) {
      Object.values(diory.links)
        .map(({ id }) => getDiory(getDiographKey(dioryKey, id), diograph))
        .filter(({ key }) => !!diograph[key])
        .forEach(({ key }) => {
          links.push({
            source: dioryKey,
            target: key,
          })
        })
    }
  })

  const nodes = Object.entries(diograph)
    .filter(([key]) => !key.endsWith('/'))
    .map(([key, diory]) => ({ ...diory, key, id: key }))

  return {
    nodes,
    links,
  }
}

const getNodeThreeObject = (node) => {
  const imageParameters = { map: new THREE.TextureLoader().load(node.image || getDefaultImage()) }
  const imageMaterial = new THREE.SpriteMaterial(imageParameters)
  const imageSprite = new THREE.Sprite(imageMaterial)
  if (node.path === '/') {
    imageSprite.scale.set(45, 30)
  } else {
    imageSprite.scale.set(15, 10)
  }

  const spriteText = new SpriteText(node.text, 0.1)
  imageSprite.add(spriteText)

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

const useDisplay = (sideBarWidth) => {
  const width = (sideBarWidth.right * window.innerWidth) / 100
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

const useFocusToStoryNode = (fgRef, storyNode) => {
  useEffect(() => {
    const distance = 80;
    const distRatio = 1 + distance/Math.hypot(storyNode.x, storyNode.y, storyNode.z);

    fgRef.current.cameraPosition(
      { x: storyNode.x * distRatio, y: storyNode.y * distRatio, z: storyNode.z * distRatio }, // new position
      storyNode, // lookAt ({ x, y, z })
      1000  // ms transition duration
    )
  }, [fgRef, storyNode.id])
}

// TODO selected diory
// - larger size
// - larger link distance
// - fix initial view

const GraphView = ({ story, diograph, onDioryClick, sideBarWidth }) => {
  const fgRef = useRef()
  useLinkDistance(fgRef)

  const { displayHeight, displayWidth } = useDisplay(sideBarWidth)

  const data = useMemo(() => mapDiographToData(diograph), [diograph])

  const storyNode = data.nodes.find(({ id }) => id === story.key)
  useFocusToStoryNode(fgRef, storyNode)

  return (
    <Fullscreen id="graph-view" background="#222222">
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
        onNodeClick={(diory) => onDioryClick({ diory })}
        onNodeDragEnd={(node) => {
          node.fx = node.x // eslint-disable-line no-param-reassign
          node.fy = node.y // eslint-disable-line no-param-reassign
          node.fz = node.z // eslint-disable-line no-param-reassign
        }}
      />
    </Fullscreen>
  )
}

GraphView.propTypes = {
  diograph: PropTypes.object.isRequired,
  onDioryClick: PropTypes.func.isRequired,
  sideBarWidth: PropTypes.object,
}

export default GraphView
