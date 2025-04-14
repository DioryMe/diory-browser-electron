import React from 'react'
import { Menu, Pane, Pill, Popover, SelectMenu } from 'evergreen-ui'
import PropTypes from 'prop-types'

const NavigationDropdown = ({ diory: selectedDiory, diories, onClick }) => {
  if (diories.length < 2) {
    return null
  }

  return (
    <Popover
      position='bottom-right'
      content={({ close }) => (
        <Menu>
          <Menu.OptionsGroup
            options={diories
              .map((diory) => ({
                label: diory.text || diory.date,
                value: diory.key,
              }))
            }
            selected={selectedDiory.key}
            onChange={(key) => {
              close()
              onClick(diories.find((diory) => diory.key === key))
            }}
          />
        </Menu>
      )}
    >
      <Pill alignSelf='center' color='red' cursor='pointer'>
        {diories.length}
      </Pill>
    </Popover>
  )
}

NavigationDropdown.propTypes = {
  diory: PropTypes.object.isRequired,
  diories: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default NavigationDropdown
