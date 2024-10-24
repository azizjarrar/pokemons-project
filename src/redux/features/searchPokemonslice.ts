import { createSlice } from '@reduxjs/toolkit';

const pokemonSearchPramsSlice = createSlice({
    name: 'searchPokemon',
    initialState: {
        params: {searchData:{},pagination:{limit:20,offset:0}},
    },
    reducers: {
        update_params: (state, action) => {
            state.params = {...state.params,searchData:{...state.params.searchData,...action.payload}};
        },
        add_offset: (state, action) =>{ 
            state.params = {...state.params,pagination:{limit:20,offset:state.params.pagination.offset+action.payload}  };
        },
        reset_offset: (state, action) =>{ 
            state.params = {...state.params,pagination:{limit:20,offset:0}  };
        }
    },
});

export const { update_params,add_offset,reset_offset } = pokemonSearchPramsSlice.actions;
export default pokemonSearchPramsSlice.reducer;