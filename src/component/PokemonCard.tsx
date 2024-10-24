// components/PokemonCard.tsx
import React from 'react';

interface PokemonCardProps {
  pokemon: any;
  handleViewMoreClick: (pokemon: any) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, handleViewMoreClick }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col h-full">
      <img src={pokemon.image} alt={pokemon.name} className="w-full h-48 object-cover rounded-t-lg" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-2 flex-grow">{pokemon.name}</h2>
      <div className="mt-2 flex-grow">
        <h3 className="text-gray-600 dark:text-gray-300">Stats:</h3>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
          <li>HP: {pokemon.stats.hp}</li>
          <li>Attack: {pokemon.stats.attack}</li>
          <li>Defense: {pokemon.stats.defense}</li>
          <li>Special Attack: {pokemon.stats.special_attack}</li>
          <li>Special Defense: {pokemon.stats.special_defense}</li>
          <li>Speed: {pokemon.stats.speed}</li>
        </ul>
      </div>
      <button
        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => handleViewMoreClick(pokemon)} 
      >
        View More
      </button>
    </div>
  );
};

export default PokemonCard;