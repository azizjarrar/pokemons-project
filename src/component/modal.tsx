/**
 * The Modal component displays detailed information about a Pokémon when triggered.
 * It presents an image of the Pokémon along with its stats and a close button.
 * The component can handle GIF images by changing the displayed image at a set interval.
 * */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFistRaised, faShieldAlt, faBolt, faRocket } from '@fortawesome/free-solid-svg-icons'; 
//
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonData: any; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, pokemonData }) => {
  const [image, setImage] = useState<string | undefined>();
  useEffect(() => {
    if (!isOpen) return; // Do nothing if modal is not open

    // Function to change the image at a set interval 4s and only images .gif
    const intervalId = setInterval(() => {
      if (pokemonData?.images?.length) {
        setImage(pokemonData.images.filter((url: string) => url.endsWith('.gif'))[Math.floor(Math.random() * pokemonData.images.filter((url: string) => url.endsWith('.gif')).length)]);
      }
    }, 4000); // Change image every 1 second

    // Clean up the interval on unmount or when the modal closes
    return () => { 
      clearInterval(intervalId);
      setImage(undefined); // Clear the image when modal is closed
    };
  }, [isOpen, pokemonData]); 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 z-10 max-w-lg mx-auto"> {/* Set a max width for the modal */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{pokemonData.name}</h2>
        <div className="w-full h-48 overflow-hidden rounded-t-lg relative">
          <img 
            src={image || pokemonData.image} 
            alt={pokemonData.name} 
            className="w-full h-full object-contain" 
          />
        </div>
        {/* Display Pokémon types */}
        <div className="mt-2 mt-5">
          <h3 className="text-lg text-gray-600 dark:text-gray-300 text-center">Types:</h3> {/* Center the header text */}
          <div className="flex justify-center flex-wrap"> {/* Center the types buttons */}
            {pokemonData?.type.map((type: string, index: number) => (
         <span
         key={index}
         className="flex items-center justify-center bg-green-500 text-white font-semibold py-1 px-3 rounded-lg m-2 mt-2"
       >
         {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize the type name */}
       </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg text-gray-600 dark:text-gray-300">Stats:</h3>
          <ul className="no-bullets pl-5 text-gray-600 dark:text-gray-300">
            <li><FontAwesomeIcon icon={faHeart} className="mr-2" /> HP: {pokemonData.stats.hp}</li>
            <li><FontAwesomeIcon icon={faFistRaised} className="mr-2" /> Attack: {pokemonData.stats.attack}</li>
            <li><FontAwesomeIcon icon={faShieldAlt} className="mr-2" /> Defense: {pokemonData.stats.defense}</li>
            <li><FontAwesomeIcon icon={faBolt} className="mr-2" /> Special Attack: {pokemonData.stats.special_attack}</li>
            <li><FontAwesomeIcon icon={faShieldAlt} className="mr-2" /> Special Defense: {pokemonData.stats.special_defense}</li>
            <li><FontAwesomeIcon icon={faRocket} className="mr-2" /> Speed: {pokemonData.stats.speed}</li>
          </ul>
        </div>
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;