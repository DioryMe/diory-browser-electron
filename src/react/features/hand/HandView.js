import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import DiorysGrid from '../../components/DiorysGrid'
import NavigationButton from '../../components/NavigationButton'

const scaleContainer = {
  transformOrigin: 'top left',
  transform: 'scale(0.5)',
  width: '200%',
  height: '200%',
}

const HandView = ({
  story,
  diorys,
  scrollIntoViewId,
  onClick,
  onClear,
  onDrop,
  onBackgroundDrop,
}) => {
  const handRef = useRef()
  return (
    <Pane background="#222" height="100%" padding={12}>
      <NavigationButton text={story.text} />
      {diorys.length ? <NavigationButton text="Clear" onClick={onClear} float="right" /> : null}
      <DiorysGrid
        ref={handRef}
        background={{ id: story.id }}
        diorys={diorys}
        scrollIntoViewId={scrollIntoViewId}
        onClick={onClick}
        onDrop={onDrop}
        onBackgroundDrop={onBackgroundDrop}
        {...scaleContainer}
      />
    </Pane>
  )
}

HandView.propTypes = {
  diorys: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onBackgroundDrop: PropTypes.func.isRequired,
}

export default HandView
