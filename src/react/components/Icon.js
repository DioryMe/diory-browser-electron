import React from 'react'
import {
  PlusIcon,
  SmallPlusIcon,
  MinusIcon,
  EditIcon,
  WrenchIcon,
  CrossIcon,
  MoveIcon,
  FullscreenIcon,
  MapIcon,
  TimeIcon,
  GridViewIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  HomeIcon,
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
    case 'arrow-right':
      return <ArrowRightIcon {...props} />
    case 'arrow-left':
      return <ArrowLeftIcon {...props} />
    case 'home':
      return <HomeIcon {...props} />
    default:
      return null
  }
}

export default Icon
