import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../graphql/apolloClient'; 
import { GET_POKEMONS } from '../../graphql/queries';

const initialState: any = {
    pokemons: [], // Array to store the fetched Pokémon data
};
// Mappings for filters and GraphQL variable names
// These mappings are used to translate the filter keys into GraphQL-friendly variable names
const mappings = {
    hp: 'minHp',
    attack: 'minAttack',
    defense: 'minDefense',
    specialAttack: 'minSpecialAttack',
    specialDefense: 'minSpecialDefense',
    speed: 'minSpeed',
    name: 'name',
    type: 'type',
    sortBy: 'sortBy',
    sortOrder: 'sortOrder'
};
// Build the where clause based on filters
// The function dynamically constructs a filtering clause for GraphQL queries based on provided filters
const buildWhereClause = (filters: any) => {
    const conditions: any[] = [];
    const order_by: any[] = []; // Initialize order_by as an array

    // Helper function to add conditions for each stat
    // If a minimum value is provided, it's added to the where clause
    const addCondition = (statName: string, minValue: number | null | undefined) => {
        if (minValue !== null && minValue !== undefined) {
            conditions.push({
                pokemon_v2_pokemonstats: {
                    pokemon_v2_stat: { name: { _eq: statName } },
                    base_stat: { _gte: minValue },
                }
            });
        }
    };

    // Adding stat-related conditions based on provided filters
    addCondition("hp", filters.minHp);
    addCondition("attack", filters.minAttack);
    addCondition("defense", filters.minDefense);
    addCondition("special-attack", filters.minSpecialAttack);
    addCondition("special-defense", filters.minSpecialDefense);
    addCondition("speed", filters.minSpeed);

    // Add a condition for Pokémon name if a filter is provided
    if (filters.name) {
        conditions.push({
            name: { _ilike: `%${filters.name}%` } // Using _ilike for case-insensitive search
        });
    }

    // Add a condition for Pokémon type if a filter is provided
    if (filters.type) {
        conditions.push({
            pokemon_v2_pokemontypes: {
                pokemon_v2_type: { name: { _eq: filters.type } }
            }
        });
    }
    // Construct the final where clause, returning an empty object if no conditions are set
    const whereClause = conditions.length > 0 ? { _and: conditions } : {}; // Return empty object if no conditions

    // Sort by name if the filter is provided
    if (filters.sortBy === 'name' && filters.sortOrder) {
        order_by.push({ name: filters.sortOrder === 'asc' ? 'asc' : 'desc' });
    }

    // Return both the where clause and sorting order
    return { where: whereClause, order_by }; 

};

// Asynchronous thunk for fetching Pokémon data with GraphQL
// Takes pagination parameters (limit and offset) and filter options
export const fetchPokemonsData = createAsyncThunk<any, any>(
    'pokemons/fetchPokemonsData', // Action type
    async (params: any = { limit: 20, offset: 0 }) => {
        try {
            const variables: Record<string, any> = {
                limit: params.limit,
                offset: params.offset,
            };
            
            Object.entries(mappings).forEach(([key, value]) => {
                if (params[key]) {
                    variables[value] = params[key];
                }
            });
            const { where, order_by } = buildWhereClause(variables); 

            const { data } = await client.query({
                query: GET_POKEMONS,
                variables: {
                    ...variables,
                    where,  // Filtering conditions
                    order_by: order_by.length > 0 ? order_by : undefined, // Set order_by only if there are valid sorting conditions
                },
            });
            //  function to recursively extract sprite URLs from nested objects
            const extractSprites = (sprites: Record<string, any>): string[] => {
                const images: string[] = [];
                const addImages = (obj: Record<string, any>) => {
                  for (let key in obj) {
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                      addImages(obj[key]);
                    } else if (typeof obj[key] === 'string' && obj[key].startsWith('https')) {
                      images.push(obj[key]);
                    }
                  }
                };
              
                addImages(sprites);
                return images;
              };
              
              return {
                new: params.new,
                params: params,
                data: data.pokemon_v2_pokemon.map((e: any) => {
                  const spriteImages = extractSprites(e.pokemon_v2_pokemonsprites[0].sprites);
                  return {
                    name: e.name,
                    images: spriteImages,  // Array of images
                    image: e.pokemon_v2_pokemonsprites[0].sprites.front_default,
                    type:e.pokemon_v2_pokemontypes.map((e:any)=>e.pokemon_v2_type.name),
                    stats: {
                      hp: e.pokemon_v2_pokemonstats.find((stat: any) => stat.pokemon_v2_stat.name === 'hp')?.base_stat || 0,
                      attack: e.pokemon_v2_pokemonstats.find((stat: any) => stat.pokemon_v2_stat.name === 'attack')?.base_stat || 0,
                      defense: e.pokemon_v2_pokemonstats.find((stat: any) => stat.pokemon_v2_stat.name === 'defense')?.base_stat || 0,
                      special_attack: e.pokemon_v2_pokemonstats.find((stat: any) => stat.pokemon_v2_stat.name === 'special-attack')?.base_stat || 0,
                      special_defense: e.pokemon_v2_pokemonstats.find((stat: any) => stat.pokemon_v2_stat.name === 'special-defense')?.base_stat || 0,
                      speed: e.pokemon_v2_pokemonstats.find((stat: any) => stat.pokemon_v2_stat.name === 'speed')?.base_stat || 0,
                    }
                  };
                }),
              };
        } catch (error) {
            throw new Error('Failed to fetch Pokémon data');
        }
    }
);

const PokemonsSlice = createSlice({
    name: 'pokemons_data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fulfilled case: Update Pokémon list based on fetched data
        builder.addCase(fetchPokemonsData.fulfilled, (state, action) => {
            if(action.payload.new){
                state.pokemons = [...action.payload.data];
            }else{
                state.pokemons = [...state.pokemons, ...action.payload.data];
            }
        });
        // Rejected case: Reset Pokémon list and log an error
        builder.addCase(fetchPokemonsData.rejected, (state) => {
            // Reset the Pokémon list on error
            state.pokemons = [];
            console.error('Failed to fetch Pokémon data, state reset.'); 
        });
    }
});

export default PokemonsSlice.reducer;