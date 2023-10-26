import React from 'react'

jest.mock('./react/features/lenses/graph/GraphView', () => <div>MockGraphView</div>)

afterEach(() => {
  jest.resetAllMocks()
})
