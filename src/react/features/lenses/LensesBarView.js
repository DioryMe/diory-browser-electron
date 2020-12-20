import React from 'react'
import PropTypes from 'prop-types'
import { Button, Tab, Pane, Tablist, Icon } from 'evergreen-ui'

const LensesBarView = ({ lenses }) => (
  <Pane display="flex">
    <Tablist alignSelf="center">
      {lenses.map(({ diory, isSelected, isFiltered, onSelect, onRemove, ...lens }) =>
        isFiltered ? (
          <Button
            {...lens}
            onClick={onSelect}
            appearance="primary"
            color=""
            borderRadius="16px"
            alignSelf="center"
            marginRight={8}
            paddingLeft={14}
            paddingRight={14}
            cursor="pointer"
            aria-controls={`panel-${lens.id}`}
            data-testid={`${lens.id}-lens`}
          >
            <Icon icon={diory.image} marginRight={8} size={16} />
            {diory.text}
            <Icon icon="small-cross" marginLeft={8} size={16} onClick={onRemove} />
          </Button>
        ) : (
          <Tab
            {...lens}
            onSelect={onSelect}
            isSelected={isSelected}
            style={{ verticalAlign: 'middle' }}
            borderRadius="16px"
            alignSelf="center"
            padding={12}
            marginRight={8}
            cursor="pointer"
            aria-controls={`panel-${lens.id}`}
            data-testid={`${lens.id}-lens`}
          >
            <Icon icon={diory.image} marginRight={8} size={16} />
            {diory.text}
            {isSelected && <Icon icon="small-plus" marginLeft={8} size={16} />}
          </Tab>
        )
      )}
    </Tablist>
  </Pane>
)

LensesBarView.propTypes = {
  lenses: PropTypes.array.isRequired,
}

export default LensesBarView
