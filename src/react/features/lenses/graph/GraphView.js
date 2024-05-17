import React, { memo, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ForceGraph3D from 'react-force-graph-3d'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'
import Fullscreen from '../../../components/Fullscreen'

const mapDiographToData = (diograph) => {
  const links = []
  Object.values(diograph).forEach((diory) => {
    if (diory.links) {
      diory.links
        .filter(({ id }) => !!diograph[id])
        .forEach((link) => {
          links.push({
            source: diory.id,
            target: link.id,
            color: 'rgba(255,255,255,1)',
            arrowColor: 'rgba(255,255,255,1)',
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
  const material = new THREE.LineBasicMaterial({ color: 0xffffff })
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

const GraphView = memo(
  ({ diograph, onDioryClick }) => {
    const fgRef = useRef()
    useLinkDistance(fgRef)

    const { displayHeight } = useDisplay()
    const data = mapDiographToData(diograph)
    return (
      <Fullscreen background="#222">
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
          linkWidth={1}
          linkColor="color"
          linkDirectionalArrowLength={2}
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
  },
  () => true
)

GraphView.propTypes = {
  diograph: PropTypes.object.isRequired,
  onDioryClick: PropTypes.func.isRequired,
}

export default GraphView
