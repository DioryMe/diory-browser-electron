import React from 'react'
import TimelineView from './TimelineView'

const TimelineLens = ({ diory, diorys, activeButton, actions }) => {
  return <TimelineView diory={diory} diorys={diorys} activeButton={activeButton} actions={actions}/>
}

export default TimelineLens
