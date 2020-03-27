import React from 'react'
import PropTypes from 'prop-types'
import Diory from './Diory'

const MAX_NUMBER_OF_DIORYS_PER_VIEW = 100

const DioryGrid = ({ diory, diorys, onClick, children, ...props }) => {
  return (
    <Diory
      diory={diory}
      onClick={onClick}
      height="100%"
      display="flex"
      flexWrap="wrap"
      {...props}
    >
      {diorys
        .slice(0, MAX_NUMBER_OF_DIORYS_PER_VIEW)
        .map(({ diory, onClick }) => (
          <Diory
            key={diory.id}
            diory={diory}
            onClick={onClick}
            flex="1 0 200px"
            height={120}
            margin={24}
            elevation={2}
            alignSelf="center"
            color="white"
            fontWeight="bold"
            background="white"
            aria-controls={`panel-${diory.id}`}
          ></Diory>
        ))}
    </Diory>
  )
}

DioryGrid.propTypes = {
  diory: PropTypes.shape({
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
  }),
  diorys: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default DioryGrid
