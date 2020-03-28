import addMiddleware from './addMiddleware'
import { initial, final } from './logger'

export const reducerWithMiddleware = (reducer) => addMiddleware([initial, reducer, final])
