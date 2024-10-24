/**
 * This component fetches and displays a list of Pokémon cards with their stats.
 * Users can scroll through the list, and clicking on a Pokémon opens a modal with more details.
 * The component uses infinite scrolling to load more Pokémon data as the user scrolls down.
 */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonsData } from '../redux/features/pokemonsslice';
import { add_offset, reset_offset } from '../redux/features/searchPokemonslice';
import Modal from '../component/modal';
import PokemonList from '../component/PokemonList'; 

const Pokemons: React.FC = () => {
  const dispatch: any = useDispatch();
  const { pokemons } = useSelector((state: any) => state.pokemons); 
  const { pagination, searchData } = useSelector((state: any) => state.pokemonSearchParams.params); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null); 
  const [NoMoreData, setNoMoreData] = useState(false); 
  const firstCall = useRef(true);
  let timeoutId: any;

  useEffect(() => {
    if (firstCall.current === true) {
      dispatch(fetchPokemonsData({ ...searchData, ...pagination }));
      firstCall.current = false;
    }
  }, []);

  useEffect(() => {
      if (pagination.offset !== 0) {
         dispatch(fetchPokemonsData({ ...searchData, ...pagination }));
      }
  }, [pagination.offset, dispatch, searchData]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(reset_offset({})); 
      const result = await dispatch(fetchPokemonsData({ ...searchData, ...pagination, offset: 0, new: true })); 
      if (result.payload.data.length === 0) {
        setNoMoreData(true); 
      } else {
        setNoMoreData(false); 
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    fetchData();
  }, [searchData]);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 200) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        dispatch(add_offset(20));
      }, 200);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleViewMoreClick = (pokemon: any) => {
    setSelectedPokemon(pokemon); 
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setSelectedPokemon(null); 
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 pb-5">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Hello, Pokémon Trainer!</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Welcome to the Pokémon App! Get ready to explore.</p>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Let's find your favorite Pokémon!</p>

      {/* Display Pokémon List */}
      <PokemonList pokemons={pokemons} handleViewMoreClick={handleViewMoreClick} NoMoreData={NoMoreData} />

      {/* Modal to show Pokémon details */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} pokemonData={selectedPokemon} />
    </div>
  );
};

export default Pokemons;