import React from 'react'
import { Menu, Pane, Pill, Popover, SelectMenu } from 'evergreen-ui'
import PropTypes from 'prop-types'

const MenuDropdown = ({ diory: selectedDiory, diories, onClick }) => {
  if (diories.length < 2) {
    return null
  }

  return (
    <Popover
      position="bottom-left"
      content={({ close }) => (
        <Menu>
          <Menu.OptionsGroup
            options={diories.map((diory) => ({
              label: diory.text || diory.date || diory.id,
              value: diory.key,
            }))}
            selected={selectedDiory && selectedDiory.key}
            onChange={(key) => {
              close()
              onClick(diories.find((diory) => diory.key === key))
            }}
          />
        </Menu>
      )}
    >
      <Pill alignSelf="center" cursor="pointer" color="grey" fontSize={10}>
        {diories.length}
      </Pill>
    </Popover>
  )
}

MenuDropdown.propTypes = {
  diory: PropTypes.object,
  diories: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { MenuDropdown }
