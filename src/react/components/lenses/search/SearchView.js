import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import CreateDioryButton from '../../diories/CreateDioryButton'
import DiorysGrid from '../../DiorysGrid'

const scaleContainer = {
  transformOrigin: 'top left',
  transform: 'scale(0.5)',
  width: '200%',
  height: '200%',
}

const SearchView = ({
  query,
  diorys,
  scrollIntoViewId,
  onClick,
  onDrop,
  onCreateDiory,
  children,
}) => {
  const searchRef = useRef()
  return (
    <Pane background="src/react/components/lenses/search#222" height="100%" padding={12}>
      <Pane padding={12}>{children}</Pane>
      {query && (
        <Pane padding={12}>
          <CreateDioryButton text={query} onClick={onCreateDiory} />
        </Pane>
      )}
      {diorys.length ? (
        <DiorysGrid
          ref={searchRef}
          background={{ id: 'hand' }}
          diorys={diorys}
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
  diorys: PropTypes.array.isRequired,
  scrollIntoViewId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onCreateDiory: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default SearchView
