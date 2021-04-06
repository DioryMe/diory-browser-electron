import { useEffect } from 'react'
import { useDispatchActions, useStore } from '../../../store'
import { createDiory, createLink } from '../../diograph/actions'

export const stravaDiory = {
  id: 'strava-activities',
  text: 'Strava activities',
  image:
    'https://play-lh.googleusercontent.com/j-ZV144PlVuTVsLuBzIKyEw9CbFnmWw9ku2NJ1ef0gZJh-iiIN1nrNPmAtvgAteyDqU',
}

const useInitializeStravaConnector = () => {
  const [{ rootId, diograph }] = useStore((state) => state.diograph)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (!diograph[stravaDiory.id] && rootId) {
      dispatch(createDiory(stravaDiory))
      dispatch(createLink({ id: rootId }, stravaDiory))
    }
  }, [dispatch, rootId])
}

export const useStravaConnector = () => {
  useInitializeStravaConnector()
}
