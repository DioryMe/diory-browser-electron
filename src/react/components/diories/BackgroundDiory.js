import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import Fullscreen from '../Fullscreen'
import Diory from './Diory'

const BackgroundDiory = ({ diory, gradient, gradientRgba, onClick, children, ...props }) => (
  <Pane
    id={`background-${diory.id}`}
    height="100%"
    display="flex"
    flexWrap="wrap"
    margin={24}
    alignContent="flex-start"
    {...props}
  >
    <Fullscreen marginTop={48}>
      <Diory diory={diory} />
    </Fullscreen>
    {children}
  </Pane>
)

BackgroundDiory.propTypes = {
  diory: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
  }),
  gradient: PropTypes.bool,
  gradientRgba: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default BackgroundDiory
