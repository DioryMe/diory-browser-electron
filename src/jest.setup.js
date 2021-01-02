window.frontendLogger = { info: jest.fn(), error: jest.fn() }

afterEach(() => {
  jest.clearAllMocks()
})
