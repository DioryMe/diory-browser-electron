import React from 'react'

jest.mock('./react/features/lenses/graph/GraphLens', () => <div>MockGraphView</div>)

afterEach(() => {
  jest.resetAllMocks()
})
