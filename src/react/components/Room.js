import React from 'react'
import Box from 'ui-box'

const Room = ({ diory: { id, image, text, ...diory }, onClick }) => (
  <Box
    key={id}
    flex="1 0 240px"
    margin={24}
    borderTop="20px solid rgba(0,0,0,0.1)"
    borderLeft="25px solid rgba(0,0,0,0.05)"
    borderRight="25px solid rgba(0,0,0,0.05)"
    borderBottom="30px solid rgba(0,0,0,0.1)"
  >
    <Box
      id={id}
      {...diory}
      height={160}
      alignSelf="center"
      onClick={onClick}
      aria-controls={`panel-${id}`}
      backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)), url(${encodeURI(
        image
      )})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundColor="pink"
      boxShadow="inset 0px -2px 50px -5px rgba(0,0,0,0.6), 0px 0px 30px 10px rgba(0,0,0,0.4)"
    >
      <Box padding={16} color="white" fontWeight="bold">
        {text}
      </Box>
    </Box>
  </Box>
)

export default Room
