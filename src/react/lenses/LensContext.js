import { createContext } from 'react'

const LensContext = createContext({ lensId: undefined, setLensId: () => {} })

export default LensContext
