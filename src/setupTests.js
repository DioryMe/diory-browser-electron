import React from 'react'

jest.mock('./react/features/lenses/GraphLens', () => <div>MockGraphView</div>)

afterEach(() => {
  jest.resetAllMocks()
})
