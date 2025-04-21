import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import CreateDioryButton from '../../../components/diories/CreateDioryButton'
import DiorysGrid from '../../../components/diories/DiorysGrid'

const scaleContainer = {
  transformOrigin: 'top left',
  transform: 'scale(0.5)',
  width: '200%',
  height: '200%',
}

const SearchView = ({
  query,
  diograph,
  scrollIntoViewId,
  onClick,
  onDrop,
  onCreateDiory,
  children,
}) => {
  const searchRef = useRef()
  return (
    <Pane background="#222" height="100%" padding={12}>
      <Pane padding={12}>{children}</Pane>
      {query && (
        <Pane padding={12}>
          <CreateDioryButton text={query} onClick={onCreateDiory} />
        </Pane>
      )}
      {Object.keys(diograph).length ? (
        <DiorysGrid
          ref={searchRef}
          background={{ id: 'hand' }}
          diograph={diograph}
          scrollIntoViewId={scrollIntoViewId}
          onClick={onClick}
          onDrop={onDrop}
          {...scaleContainer}
        />
      ) : null}
    </Pane>
  )
}

SearchView.propTypes = {
  query: PropTypes.string.isRequired,
  diograph: PropTypes.object.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onCreateDiory: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export { SearchView }
