import React from 'react';
import NavBar from './layouts/navbar';
import SearchMenu from './layouts/searchMenu';
import Pokemons from './layouts/pokemons';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="flex flex-col md:flex-row justify-center items-start max-w-screen-xl mx-auto p-4 gap-5">
        <div className="flex-none w-full md:w-1/4 mb-4 md:mb-0 md:sticky md:top-0"> 
        <SearchMenu />
        </div>
        <div className="flex-grow">
          <Pokemons />
        </div>
      </div>
    </div>
  );
}

export default App;