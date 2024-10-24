// store.ts
import { configureStore } from '@reduxjs/toolkit';
import pokemonsslice from './features/pokemonsslice';
import searchPokemonslice from './features/searchPokemonslice';

const store = configureStore({
    reducer: {
        pokemons: pokemonsslice,
        pokemonSearchParams:searchPokemonslice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;