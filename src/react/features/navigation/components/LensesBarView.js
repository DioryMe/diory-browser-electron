import React from 'react'
import PropTypes from 'prop-types'
import { Pane, Tablist } from 'evergreen-ui'
import LensButton from '../../../components/LensButton'

const LensesBarView = ({ lenses }) => (
  <Pane display="flex">
    <Tablist alignSelf="center">
      {lenses.map((lens) => (
        <LensButton {...lens} />
      ))}
    </Tablist>
  </Pane>
)

LensesBarView.propTypes = {
  lenses: PropTypes.array.isRequired,
}

export default LensesBarView
