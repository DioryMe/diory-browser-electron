import React from 'react'
import { Menu, Pill, Popover } from 'evergreen-ui'
import PropTypes from 'prop-types'

const MenuDropdown = ({ diory: selectedDiory, diories, onClick }) => {
  const index = selectedDiory && diories.map(({ key }) => key).indexOf(selectedDiory.key) + 1
  return (
    <Popover
      position="bottom-right"
      // eslint-disable-next-line react/no-unstable-nested-components
      content={({ close }) => (
        <Menu inverted>
          <Menu.OptionsGroup
            options={diories.map((diory, index) => ({
              label: `${index + 1}: ${diory.text || diory.date || diory.id}`,
              value: diory.key,
            }))}
            selected={selectedDiory && selectedDiory.key}
            onChange={(key) => {
              close()
              onClick({ diory: { key } })
            }}
          />
        </Menu>
      )}
    >
      <Pill alignSelf="center" cursor="pointer" color="grey" fontSize={10}>
        {index ? `${index}/${diories.length}` : diories.length}
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
