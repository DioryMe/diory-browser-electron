import React from 'react'

import DeleteView from './DeleteView'
import deleteViewFixtureDiograph from './deleteViewFixtureDiograph'

export default {
  title: 'Delete view',
  component: DeleteView,
}

const focusDiory = deleteViewFixtureDiograph.someDioryId
const linkDiory = deleteViewFixtureDiograph.linkedDioryId1

const links = [
  {
    fromDiory: focusDiory,
    toDiory: linkDiory,
  },
  {
    fromDiory: linkDiory,
    toDiory: focusDiory,
  },
]

export const initially = () => <DeleteView />

export const withLink = () => <DeleteView diorys={links} />

export const withDiory = () => <DeleteView diory={focusDiory} />

export const withDioryAndLinks = () => <DeleteView diory={focusDiory} diorys={links} />
