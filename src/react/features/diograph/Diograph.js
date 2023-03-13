import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ForceGraph3D from 'react-force-graph-3d'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'

const mapDiographToData = (diograph) => {
  const links = []
  Object.values(diograph).forEach((diory) => {
    if (diory.links) {
      Object.values(diory.links).forEach((link) => {
        links.push({
          source: diory.id,
          target: link.id,
          color: 'rgba(255,255,255,0.3)',
          arrowColor: 'rgba(255,255,255,0.2)',
        })
      })
    }
  })

  return {
    nodes: Object.values(diograph),
    links,
  }
}

const getNodeThreeObject = (storyId) => (node) => {
  const imageTexture = new THREE.TextureLoader().load(node.image)
  const imageMaterial = new THREE.SpriteMaterial({ map: imageTexture, color: 0xffffff })
  const imageSprite = new THREE.Sprite(imageMaterial)
  if (node.id === storyId) {
    imageSprite.scale.set(40, 30)
  } else {
    imageSprite.scale.set(20, 15)
  }

  const spriteText = new SpriteText(node.text, 0.1)
  imageSprite.add(spriteText)

  return imageSprite
}

const useLinkDistance = (ref, storyId) => {
  useEffect(() => {
    ref.current.d3Force('link').distance((link) => {
      if (link.source.id === storyId) {
        return 50
      }
      if (link.target.links) {
        return Object.keys(link.target.links).length * 10
      }
      return 10
    })
  }, [ref, storyId])
}

const Diograph = ({ storyId, diograph, onDioryClick }) => {
  const fgRef = useRef()
  useLinkDistance(fgRef, storyId)
  const nodeThreeObject = getNodeThreeObject(storyId)
  const data = mapDiographToData(diograph)

  return (
    <ForceGraph3D
      ref={fgRef}
      // width={1800}
      // height={1200}
      showNavInfo={false}
      backgroundColor="#000"
      graphData={data}
      nodeRelSize={0}
      nodeLabel="text"
      nodeThreeObject={nodeThreeObject}
      linkOpacity={1}
      linkWidth={1}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowColor="arrowColor"
      cooldownTicks={100}
      onEngineStop={() => fgRef.current.zoomToFit(400)}
      onNodeClick={onDioryClick}
      onNodeDragEnd={(node) => {
        node.fx = node.x // eslint-disable-line no-param-reassign
        node.fy = node.y // eslint-disable-line no-param-reassign
        node.fz = node.z // eslint-disable-line no-param-reassign
      }}
    />
  )
}

Diograph.propTypes = {
  diograph: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired,
  onDioryClick: PropTypes.func.isRequired,
}

export default Diograph
