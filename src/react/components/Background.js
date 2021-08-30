import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const Background = ({ id, style, children, ...props }) => (
  <Pane
    id={`background-${id}`}
    height="100%"
    display="flex"
    flexWrap="wrap"
    margin={24}
    alignContent="flex-start"
    style={style}
    {...props}
  >
    {children}
  </Pane>
)

Background.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
}

export default Background
