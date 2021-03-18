import React from 'react'
import { StoreProvider } from '../../../store/StoreContext'

import DeleteView from './DeleteView'
import deleteViewFixtureDiograph from './deleteViewFixtureDiograph'

const initialDeleteViewState = {
  diograph: {
    diograph: deleteViewFixtureDiograph,
  },
}

export default {
  title: 'Delete view',
  component: DeleteView,
  decorators: [
    (Story) => (
      <StoreProvider initialState={initialDeleteViewState}>
        <Story />
      </StoreProvider>
    ),
  ],
}

const focusDiory = initialDeleteViewState.diograph.diograph.someDioryId
const linkDiory = initialDeleteViewState.diograph.diograph.linkedDioryId1
const { dioryWithoutLinks } = initialDeleteViewState.diograph.diograph

export const withLink = () => <DeleteView focus={focusDiory} clickedDiory={linkDiory} />

export const withDiory = () => (
  <DeleteView focus={dioryWithoutLinks} clickedDiory={dioryWithoutLinks} />
)

export const withDioryAndLinks = () => <DeleteView focus={focusDiory} clickedDiory={focusDiory} />
