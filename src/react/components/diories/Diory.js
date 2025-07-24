import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import { Pane, Icon } from 'evergreen-ui'

import { Image } from './Image'
import { GridImage } from './GridImage'
import { isDefaultImage } from '../../../shared/getDefaultImage'
import { Gradient } from './Gradient'

const defaultStyle = {
  container: {
    position: 'relative',
    height: '100%',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    padding: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
  },
  topCorner: {
    position: 'absolute',
    padding: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
    top: 0,
    right: 0,
  },
}

const buttonStyles = {
  width: '18px',
  height: '18px',
  textAlign: 'center',
  border: '3px solid rgba(255, 255, 255, 0.6)',
}

const SelectButton = ({ diory, onClick }) => (
  <Pane
    {...buttonStyles}
    backgroundColor={diory.selected ? 'rgba(255, 255, 255, 0.6)' : ''}
    onClick={(event) => {
      event.stopPropagation()
      onClick()
    }}
  />
)

SelectButton.propTypes = {
  diory: PropTypes.object,
  onClick: PropTypes.func,
}

const Diory = ({ diory, isGridImage, onSelect, onClick, children, ...props }) => {
  const { id, text, image, style: dioryStyle = {}, data, links, selected } = diory
  const {
    image: styleImage,
    text: styleText,
    links: styleLinks,
    width: flexBasis,
    background = '#414141',
    ...style
  } = dioryStyle

  return (
    <Box
      id={id}
      flexBasis={flexBasis}
      height="100%"
      {...props}
      {...style}
      onClick={(event) => onClick && onClick({ diory, event })}
    >
      <Box {...defaultStyle.container} background={background}>
        {!isGridImage && image && <Image image={image} style={styleImage} />}
        {text && image && !isDefaultImage(image) && <Gradient />}
        {text && (
          <Box {...defaultStyle.text} {...styleText}>
            {text}
          </Box>
        )}
        {data && data.icon && (
          <Pane>
            <Icon key="icon" size={80} style={{ width: '100%', opacity: 0.8 }} {...data} />
          </Pane>
        )}
        {selected == null && links && links.length && (
          <Box {...defaultStyle.topCorner} {...styleLinks}>
            {links.length}
          </Box>
        )}
        {isGridImage && <GridImage image={image} style={styleImage} />}
        {selected != null && (
          <Box {...defaultStyle.topCorner} {...styleLinks}>
            <SelectButton diory={diory} onClick={() => onSelect && onSelect({ diory })} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

Diory.propTypes = {
  diory: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.array,
    links: PropTypes.array,
    selected: PropTypes.bool,
  }),
  isGridImage: PropTypes.bool,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  children: PropTypes.node,
}

export default Diory
