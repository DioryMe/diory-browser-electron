import React from 'react'
import { Pane } from 'evergreen-ui'

const circleStyle = {
  opacity: 0.5,
  borderRadius: '50%',
  padding: 8,
  margin: 4,
}

const ContentCounter = ({ selected, amount }) => (
  <Pane
    position="relative"
    padding={12}
    display="flex"
    flexDirection="row"
    justifyContent="center"
    width="100%"
  >
    {[...Array(amount).keys()].map((index) => (
      <Pane key={index} {...circleStyle} backgroundColor={index === selected ? 'grey' : 'white'} />
    ))}
  </Pane>
)

export const ContentCarousel = ({ selected, amount, onClick, children }) => (
  <Pane onClick={onClick} height="100%" padding={24} cursor={amount > 1 ? 'pointer' : 'default'}>
    {children}
    {amount > 1 && <ContentCounter selected={selected} amount={amount} />}
  </Pane>
)
