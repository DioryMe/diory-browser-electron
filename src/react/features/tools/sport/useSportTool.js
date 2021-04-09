import { useEffect } from 'react'
import { useDispatch, useDispatchActions, useStore } from '../../../store'
import { inactivateButton } from '../../buttons/actions'
import { stravaDiory } from '../../connectors/strava/useStravaConnector'

import { SPORT_TOOL_BUTTON } from './buttons'
import { createDiory, createLink, addDiorys, createLinks } from '../../diograph/actions'

export const timelineDiory = {
  id: 'timeline',
  text: 'Timeline',
  image: '',
}

const useInitializeTimeline = () => {
  const [{ rootId, diograph }] = useStore((state) => state.diograph)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (!diograph[timelineDiory.id] && rootId) {
      dispatch(createDiory(timelineDiory))
      dispatch(createLink({ id: rootId }, timelineDiory))
    }
  }, [dispatch, rootId])
}

function getLinks(diorys) {
  return diorys.reduce((obj, { id }) => ({
    ...obj,
    [id]: { id },
  }), {})
}

const useGenerateSportDiorys = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  return {
    generateSportDiorys: () => {
      console.log(diograph[stravaDiory.id])
      const sportIds = Object.values(diograph[stravaDiory.id].links).map(({ id }) => id)
      return Object.values(sportIds
        .reduce((years, id) => {
          const diory = diograph[id]
          const year = diory.date.slice(0,4)
          const yearDiory = years[year] || {}

          if (!yearDiory.linkedDiorys) {
             yearDiory.linkedDiorys = []
          }

          console.log([...yearDiory.linkedDiorys, diory])

          return {
            ...years,
            [year]: {
              id: 'sport_summary_' + year,
              text: `Year ${year} Totals`,
              linkedDiorys: [...yearDiory.linkedDiorys, diory],
            }
          }
        }, {}))
        .map(({ linkedDiorys, ...diory }) => ({
          ...diory,
          links: getLinks(linkedDiorys),
          data: [
            {
              '@context': 'https://diograph.org',
              '@type': 'ExerciseSummary',
              days: 'getDays(linkedDiorys)',
              activities: 'getActivities(linkedDiorys)',
              distance: 'getDistance(linkedDiorys)',
              duration: 'getDuration(linkedDiorys)',
              startTime: 'getStartTime(linkedDiorys)',
              endTime: 'getEndTime(linkedDiorys)',
            }
          ]
        }))
    }
  }
}

export const useSportTool = () => {
  useInitializeTimeline()
  const { generateSportDiorys } = useGenerateSportDiorys()

  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  useEffect(async () => {
    if (SPORT_TOOL_BUTTON === active) {
      dispatch(inactivateButton())
      const sportDiorys = generateSportDiorys()
      dispatch(addDiorys(sportDiorys))
      dispatch(createLinks(timelineDiory, sportDiorys))
    }
  }, [active, dispatch])
}
