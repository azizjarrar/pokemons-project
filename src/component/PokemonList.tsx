// components/PokemonList.tsx
import React from 'react';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemons: any[];
  handleViewMoreClick: (pokemon: any) => void;
  NoMoreData: boolean;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, handleViewMoreClick, NoMoreData }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 p-4">
      {pokemons && pokemons.length > 0 ? (
        pokemons.map((pokemon: any, index: number) => (
          <PokemonCard key={index} pokemon={pokemon} handleViewMoreClick={handleViewMoreClick} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          {!NoMoreData ? (
            <p className="text-lg text-gray-600 dark:text-gray-300">Loading Pokémon...</p>
          ) : (
            <p className="text-lg text-gray-600 dark:text-gray-300 w-full text-center">No Pokémon found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonList;