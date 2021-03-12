import React from 'react'
import { StoreProvider } from '../../../store/StoreContext'

import DeleteView from './DeleteView'

export default {
  title: 'Delete view',
  component: DeleteView,
  decorators: [
    (Story) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    ),
  ],
  parameters: {
    chromatic: { delay: 5000 },
  },
}

const focusDiory = {
  id: 'some-diory-id',
  text: 'some-diory',
  links: {
    'some-file-name': { id: 'link-diory-id' },
  },
}

const linkDiory = {
  id: 'link-diory-id',
  text: 'link-diory',
  links: {
    'some-diory-file-name': { id: 'some-diory-id' },
  },
}

const dioryWithoutLinks = {
  id: 'some-diory-without-links-id',
  text: 'some-diory-without-links',
}

export const initially = () => <DeleteView />

export const withLink = () => <DeleteView focus={focusDiory} linkDiory={linkDiory} />

export const withDiory = () => (
  <DeleteView focus={dioryWithoutLinks} linkDiory={dioryWithoutLinks} />
)

export const withDioryAndLink = () => <DeleteView focus={focusDiory} linkDiory={focusDiory} />
