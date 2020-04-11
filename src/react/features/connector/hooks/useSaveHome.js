import { useEffect } from 'react'
import { useStore, usePromiseDispatch } from '../../../store'

// import { saveRoom } from '../../room/actions'
//
// import { connect } from '../client'
// import { channels } from '../../../../shared/constants'

import { debounce } from '../../../utils'

export const useSaveHome = () => {
  const [{ rooms, updated }] = useStore((state) => state.home)
  const promiseDispatch = usePromiseDispatch()
  useEffect(() => {
    if (updated) {
      debounce(
        // promiseDispatch(saveHome, () => connect(channels.SAVE_HOME, { rooms })),
        500
      )
    }
  }, [updated, rooms, promiseDispatch])
}
