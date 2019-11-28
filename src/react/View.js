import React from 'react';

import useLenses  from './lenses/useLenses'

import NavBar from './components/NavBar'
import Breadcrumb from './components/Breadcrumb'
import SelectedLens from './lenses/SelectedLens'
import Home from './Home'

const App = () => {
  const [{ selectedLensId, lenses }] = useLenses()

  const navbar = {
    lenses,
    search: {
      placeholder: 'Search diories...',
    }
  }
  const history = [
    {id: '2019', text: '2019'},
    {id: '2018', text: '2018'},
    {id: '2017', text: '2017'},
    {id: '2016', text: '2016'},
    {id: '2015', text: '2015'},
  ]

  return (
    <>
      <NavBar {...navbar}/>
      <Breadcrumb diorys={history}/>
      <SelectedLens/>
      { !selectedLensId && <Home/>}
    </>
  );
}

export default App;
