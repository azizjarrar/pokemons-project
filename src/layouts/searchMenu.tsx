/**
 * The SearchMenu component provides a user interface for searching Pokémon based on various criteria.
 * Users can filter by name, type, and stats (HP, Attack, Defense, etc.), as well as sort the results.
 * The component supports dark mode and updates the search parameters in the global Redux state.
 * 
 * Features:
 * - Input fields for Pokémon name and stats with sliders for dynamic filtering.
 * - Dropdown menus for selecting Pokémon type and sorting options.
 * - A toggle for dark mode to enhance user experience.
 * - Automatically dispatches updates to the Redux store whenever search parameters change.
 */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { update_params } from '../redux/features/searchPokemonslice';

const SearchMenu: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch: any = useDispatch();
  const [stats, setStats] = useState({
    name: '',
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
    sortBy: 'name',
    sortOrder: 'asc',
    type: ''
  });

  useEffect(() => {
    dispatch(update_params(stats));
  }, [stats]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.classList.toggle('bg-gray-900', darkMode);
    document.body.classList.toggle('bg-white', !darkMode);
  }, [darkMode]);

  const handleStatChange = (e: React.ChangeEvent<HTMLInputElement>, stat: keyof typeof stats) => {
    setStats({ ...stats, [stat]: Number(e.target.value) });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStats({ ...stats, sortBy: e.target.value });
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStats({ ...stats, sortOrder: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStats({ ...stats, type: e.target.value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStats({ ...stats, name: e.target.value });
  };

  return (
    <div className={`shadow-md rounded-lg p-4 max-w-lg mx-auto bg-primary dark:bg-primary-dark sm:p-6`}>
      <h2 className="text-2xl font-bold text-center mb-2 text-text-color dark:text-text-color-dark">Search for Pokémon</h2>

      <div className="flex justify-between mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="mr-2"
          />
          <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dark Mode</span>
        </label>
      </div>

      {/* Scrollable Content */}
      <div className="max-h-[70vh] overflow-y-auto">
        {/* Pokémon Name Input */}
        <div className="mb-2">
          <input
            type="text"
            placeholder="Enter Pokémon name"
            value={stats.name}
            onChange={handleNameChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border-border-color dark:border-border-color-dark bg-white dark:bg-gray-800 text-black dark:text-white`}
          />
        </div>

        {/* Type Select */}
        <div className="flex flex-col mb-2">
          <label className="text-sm font-semibold mb-1 text-text-color dark:text-text-color-dark">Select Type:</label>
          <select
            value={stats.type}
            onChange={handleTypeChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border-border-color dark:border-border-color-dark bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="">All Types</option>
            {['Fire', 'Water', 'Grass', 'Electric', 'Ghost', 'Dragon', 'Bug', 'Fighting', 'Poison', 'Psychic', 'Normal', 'Rock', 'Flying', 'Fairy', 'Ground', 'Steel', 'Ice'].map(type => (
              <option key={type} value={type.toLowerCase()}>{type}</option>
            ))}
          </select>
        </div>

        {/* Stats Slider UI */}
        {(['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'] as Array<keyof typeof stats>).map(stat => (
          <div key={stat} className="mb-2">
            <label className="text-sm font-semibold mb-1 flex justify-between text-text-color dark:text-text-color-dark">
              <span>{stat.charAt(0).toUpperCase() + stat.slice(1)}: {stats[stat]}</span>
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={stats[stat]}
              onChange={(e) => handleStatChange(e, stat)}
              className="w-full"
            />
          </div>
        ))}

        {/* Sort By */}
        <div className="mb-2">
          <label className="text-sm font-semibold mb-1 text-text-color dark:text-text-color-dark">Sort By:</label>
          <select value={stats.sortBy} onChange={handleSortChange} className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white">
            <option value="name">Name</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="mb-2">
          <label className="text-sm font-semibold mb-1 text-text-color dark:text-text-color-dark">Sort Order:</label>
          <select value={stats.sortOrder} onChange={handleSortOrderChange} className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>


    </div>
  );
};

export default SearchMenu;