import {
  PlusIcon,
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

export const getIcon = (icon) => {
  switch (icon) {
    case 'plus':
      return PlusIcon
    case 'minus':
      return MinusIcon
    case 'edit':
      return EditIcon
    case 'wrench':
      return WrenchIcon
    case 'cross':
      return CrossIcon
    case 'move':
      return MoveIcon
    case 'fullscreen':
      return FullscreenIcon
    case 'map':
      return MapIcon
    case 'time':
      return TimeIcon
    case 'grid-view':
      return GridViewIcon
    case 'arrow-right':
      return ArrowRightIcon
    case 'arrow-left':
      return ArrowLeftIcon
    case 'home':
      return HomeIcon
    default:
      return null
  }
}
