import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const useShowContent = (show) => {
  const [showContent, setShowContent] = useState(false)
  useEffect(() => {
    if (!show) {
      setShowContent(false)
    }
    if (show) {
      setTimeout(() => {
        setShowContent(show)
      }, 10)
    }
  }, [show])

  return { showContent }
}

const SidePanelToggle = ({ show, children }) => {
  const { showContent } = useShowContent(show)

  return showContent ? children : null
}

SidePanelToggle.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export { SidePanelToggle }
