import React from 'react'

import { useStore } from '../../store'

import Navigation from '../navigation/Navigation'
import Filters from '../filters/Filters'
import Lenses from '../lenses/Lenses'
import Rooms from '../rooms/Rooms'
import Tools from '../tools/Tools'
import Buttons from '../buttons'
import Connectors from '../connectors/Connectors'
import Search from '../search/Search'
import SearchResults from '../search/SearchResults'
import SearchResultAutocomplete from '../search/SearchResultAutocomplete'

const Search2 = () => {
  const [{ query, active }] = useStore((state) => state.search)

  return active ? (
    <div
      style={{
        backgroundColor: 'white',
        position: 'fixed',
        top: '48px',
        right: 0,
        width: '300px',
        height: '100%',
      }}
    >
      <Search />
      {query ? <SearchResultAutocomplete /> : null}
      <SearchResults />
    </div>
  ) : null
}

const Home = () => (
  <div className="App">
    <Navigation />
    <Rooms />
    <Lenses />
    <Filters />
    <Tools />
    <Buttons />
    <Connectors />
    <Search2 />
  </div>
)

export default Home
