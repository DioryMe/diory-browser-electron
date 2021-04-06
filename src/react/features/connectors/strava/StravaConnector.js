import React from 'react'
import { useFocus } from '../../diograph/hooks'
import { useStravaConnector } from './useStravaConnector'
import StravaButton from './StravaButton'

const StravaConnector = () => {
  useStravaConnector()
  const { diory } = useFocus()
  return <div data-testid="strava-connector">{diory && <StravaButton />}</div>
}

export default StravaConnector
