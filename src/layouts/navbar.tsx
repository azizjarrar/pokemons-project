import pokemonball from '../assets/images/pokemonball.png';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-navbar-light p-4 shadow-md dark:bg-navbar-dark">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center">
          <img
            src={pokemonball}
            alt="Pokemon Ball Logo"
            className="w-10 h-10"
          />
          <span className="ml-3 text-text-color dark:text-text-color-dark text-2xl font-bold">Pokemon</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;