import React from 'react'
import PropTypes from 'prop-types'
import { Pane, Heading } from 'evergreen-ui'

const Home = ({rooms}) => (
  <Pane
    height="100%"
    display="flex"
    flexWrap="wrap"
    padding={24}
  >
    {rooms.map(({id, name, icon, isSelected, onClick}) => (
      <Pane
        key={id}
        id={id}
        flex="1 0 200px"
        height={120}
        margin={24}
        elevation={2}
        alignSelf="center"
        background="white"
        onSelect={onClick}
        aria-controls={`panel-${id}`}
      >
        <Heading margin={16}>{name}</Heading>
      </Pane>
    ))}
  </Pane>
)

Home.defaultProps = {
  rooms: [
    {name: '2019'},
    {name: '2018'},
    {name: '2017'},
    {name: '2016'},
    {name: '2015'},
  ]
}

Home.propTypes = {
  rooms: PropTypes.object,
}

export default Home
