import React from 'react'

import { useSearch } from './useSearch'
import SearchView from './SearchView'
import { withLensContainer } from '../withLensContainer'

import button from './diory'

const Search = () => <SearchView {...useSearch()} />

export default withLensContainer('search', button)(Search)
