import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import CreateDioryButton from '../../../components/diories/CreateDioryButton'
import DiorysGrid from '../../../components/diories/DiorysGrid'
import Fullscreen from '../../../components/Fullscreen'
import { SideBarTitle } from '../../sideBar/components/SideBarTitle'

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
    <>
      <Pane padding={6}>
        <SideBarTitle text="SEARCH" />
        <Pane padding={6}>{children}</Pane>
        {query && (
          <Pane padding={6}>
            <CreateDioryButton text={query} onClick={onCreateDiory} />
          </Pane>
        )}
      </Pane>
      <Pane position="relative" flex={1} margin={12}>
        <Fullscreen>
          {Object.keys(diograph).length ? (
            <DiorysGrid
              ref={searchRef}
              background={{ id: 'hand' }}
              diorys={Object.values(diograph)}
              scrollIntoViewId={scrollIntoViewId}
              onClick={onClick}
              onDrop={onDrop}
              {...scaleContainer}
            />
          ) : null}
        </Fullscreen>
      </Pane>
    </>
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
