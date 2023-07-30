import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ForceGraph3D from 'react-force-graph-3d'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'
import Fullscreen from '../../../components/Fullscreen'

const mapDiographToData = (diograph) => {
  const links = []
  Object.values(diograph).forEach((diory) => {
    if (diory.links) {
      Object.values(diory.links).forEach((link) => {
        links.push({
          source: diory.id,
          target: link.id,
          color: 'rgba(0,0,0,1)',
          arrowColor: 'rgba(0,0,0,1)',
        })
      })
    }
  })

  return {
    nodes: Object.values(diograph).map((diory) => ({ ...diory })),
    links,
  }
}

const getNodeThreeObject = (node) => {
  const imageParameters = node.image
    ? { map: new THREE.TextureLoader().load(node.image) }
    : { color: '#69f' }
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
  const material = new THREE.LineBasicMaterial({ color: 0x000000 })
  const geometry = new THREE.BufferGeometry()
  return new THREE.Line(geometry, material)
}

const useLinkDistance = (ref) => {
  useEffect(() => {
    ref.current.d3Force('link').distance((link) => {
      if (link.source.path === '/') {
        return 30
      }
      if (link.target.links) {
        return Object.keys(link.target.links).length * 10
      }
      return 10
    })
  }, [ref])
}

const useDisplay = () => {
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth)
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight)

  window.addEventListener('resize', () => {
    setDisplayWidth(window.innerWidth)
    setDisplayHeight(window.innerHeight)
  })

  return {
    displayWidth,
    displayHeight,
  }
}

// TODO selected diory
// - larger size
// - larger link distance
// - focus camera

const GraphView = ({ diograph, onDioryClick }) => {
  const fgRef = useRef()
  useLinkDistance(fgRef)

  const { displayHeight } = useDisplay()
  const data = mapDiographToData(diograph)

  return (
    <Fullscreen>
      <ForceGraph3D
        ref={fgRef}
        width={500}
        height={displayHeight}
        showNavInfo={false}
        backgroundColor="rgba(0,0,0,0)"
        graphData={data}
        nodeLabel="text"
        nodeThreeObject={getNodeThreeObject}
        linkThreeObject={getLinkThreeObject}
        linkOpacity={1}
        linkWidth={0.5}
        linkColor="color"
        linkDirectionalArrowLength={3}
        linkDirectionalArrowColor="arrowColor"
        onNodeClick={onDioryClick}
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
}

export default GraphView
