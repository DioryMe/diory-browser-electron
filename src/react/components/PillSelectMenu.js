import React from 'react'
import { Pane, Pill, SelectMenu } from 'evergreen-ui'
import PropTypes from 'prop-types'

const PillSelectMenu = ({ isShown, options, onClick }) =>
  isShown ? (
    <Pane alignSelf="center">
      <SelectMenu
        title="Select context:"
        options={options}
        hasFilter={false}
        maxWidth={200}
        onSelect={onClick}
      >
        <Pill alignSelf="center" margin={8} color="red" cursor="pointer">
          {options.length}
        </Pill>
      </SelectMenu>
    </Pane>
  ) : null

PillSelectMenu.propTypes = {
  isShown: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default PillSelectMenu
