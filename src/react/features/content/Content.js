import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from '../../store'
import { useDiograph } from '../diograph/useDiograph'

import ContentView from './ContentView'

const Content = ({ diory }) => {
  return <ContentView diory={diory} />
}

export default Content
