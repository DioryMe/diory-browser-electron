import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

const useScrollIntoView = (scrollRef, scrollIntoView) => {
  useEffect(() => {
    if (scrollIntoView) {
      setTimeout(() => scrollRef.current.scrollIntoView(), 0)
    }
  }, [scrollRef, scrollIntoView])
}

const GridItem = ({ scrollIntoView, children, ...props }) => {
  const scrollRef = useRef()
  useScrollIntoView(scrollRef, scrollIntoView)

  return (
    <Box ref={scrollRef} {...props}>
      {children}
    </Box>
  )
}

GridItem.propTypes = {
  scrollIntoView: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default GridItem
