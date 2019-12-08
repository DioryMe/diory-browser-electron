import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Pane, Text, Icon } from 'evergreen-ui'

const NUMBER_OF_ITEMS = 3
const isFiltered = history => history.length > NUMBER_OF_ITEMS
const extraItems = history => history.length - NUMBER_OF_ITEMS

const Breadcrumb = ({ diorys }) => (
  <Pane display="flex" padding={16} alignItems="center">
    <Pane>
      <Icon key="home" icon="home" />
    </Pane>
    {isFiltered(diorys) && (
      <Fragment key="more">
        <Icon icon="chevron-right" />
        <Text>...</Text>
      </Fragment>
    )}
    {diorys.slice(extraItems(diorys)).map(({ id, text, onClick }) => (
      <Fragment key={id}>
        <Icon icon="chevron-right" />
        <Text onClick={onClick}>{text}</Text>
      </Fragment>
    ))}
  </Pane>
)

Breadcrumb.propTypes = {
  diorys: PropTypes.array,
}

export default Breadcrumb
