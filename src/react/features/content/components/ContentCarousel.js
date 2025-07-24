import React from 'react'
import { Pane } from 'evergreen-ui'
import PropTypes from 'prop-types'

const circleStyle = {
  opacity: 0.5,
  borderRadius: '50%',
  padding: 8,
  margin: 4,
}

const ContentCounter = ({ selectedIndex, amount }) => (
  <Pane
    position="relative"
    padding={12}
    display="flex"
    flexDirection="row"
    justifyContent="center"
    width="100%"
  >
    {[...Array(amount).keys()].map((index) => (
      <Pane key={index} {...circleStyle} backgroundColor={index === selectedIndex ? 'grey' : 'white'} />
    ))}
  </Pane>
)

const ContentCarousel = ({ selectedIndex, amount, onClick, children }) => (
  <Pane onClick={onClick} height="100%" padding={24} cursor={amount > 1 ? 'pointer' : 'default'}>
    {children}
    {amount > 1 && <ContentCounter selectedIndex={selectedIndex} amount={amount} />}
  </Pane>
)

ContentCarousel.propTypes = {
  selectedIndex: PropTypes.number,
  amount: PropTypes.number,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export { ContentCarousel }
