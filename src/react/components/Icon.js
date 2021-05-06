import React from 'react'
import PropTypes from 'prop-types'
import {
  PlusIcon,
  SmallPlusIcon,
  MinusIcon,
  EditIcon,
  WrenchIcon,
  CrossIcon,
  SmallCrossIcon,
  MoveIcon,
  FullscreenIcon,
  MapIcon,
  TimeIcon,
  GridViewIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  ErrorIcon,
  HandIcon,
  FolderOpenIcon,
} from 'evergreen-ui'

const Icon = ({ icon, ...props }) => {
  switch (icon) {
    case 'plus':
      return <PlusIcon {...props} />
    case 'small-plus':
      return <SmallPlusIcon {...props} />
    case 'minus':
      return <MinusIcon {...props} />
    case 'edit':
      return <EditIcon {...props} />
    case 'wrench':
      return <WrenchIcon {...props} />
    case 'cross':
      return <CrossIcon {...props} />
    case 'small-cross':
      return <SmallCrossIcon {...props} />
    case 'move':
      return <MoveIcon {...props} />
    case 'fullscreen':
      return <FullscreenIcon {...props} />
    case 'map':
      return <MapIcon {...props} />
    case 'time':
      return <TimeIcon {...props} />
    case 'grid-view':
      return <GridViewIcon {...props} />
    case 'arrow-left':
      return <ArrowLeftIcon {...props} />
    case 'arrow-right':
      return <ArrowRightIcon {...props} />
    case 'chevron-left':
      return <ChevronLeftIcon {...props} />
    case 'chevron-right':
      return <ChevronRightIcon {...props} />
    case 'home':
      return <HomeIcon {...props} />
    case 'error-icon':
      return <ErrorIcon {...props} />
    case 'hand':
      return <HandIcon {...props} />
    case 'folder':
      return <FolderOpenIcon {...props} />
    default:
      return <ErrorIcon {...props} />
  }
}

Icon.defaultProps = {
  icon: 'error-icon',
}

Icon.propTypes = {
  icon: PropTypes.string,
}

export default Icon
