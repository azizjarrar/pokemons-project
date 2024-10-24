import { gql } from '@apollo/client';

/**
 * GraphQL query to get a list of Pokémon with specified limit.
 */
export const GET_POKEMONS = gql`
  query getPokemons(
    $limit: Int!,
    $offset: Int!,
    $where: pokemon_v2_pokemon_bool_exp!,  # Adjusted to use the correct type
    $order_by: [pokemon_v2_pokemon_order_by!]  # Add order_by parameter
  ) {
    pokemon_v2_pokemon(
      limit: $limit,
      offset: $offset,
      where: $where,  # Use the 'where' variable
      order_by: $order_by  # Include order_by in the query
    ) {
      id
      base_experience
      height
      is_default
      name
      order
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        pokemon_v2_stat {
          name
        }
        base_stat
      }
    }
  }
`;