import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';

const GET_POKEMONS = gql`
  query getPokemons($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        image
        types
      }
    }
  }
`;

const Home = () => {
    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: {
            limit: 20,
            offset: 0,
        },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Pokemon List</h1>
            <ul>
                {data.pokemons.results.map(pokemon => (
                    <li key={pokemon.id}>
                        <Link href={`/pokemon/${pokemon.name}`}>
                            <a>
                                <img src={pokemon.image} alt={pokemon.name} />
                                <div>
                                    <p>Number: {pokemon.id}</p>
                                    <p>Name: {pokemon.name}</p>
                                    <p>Type: {pokemon.types.join(', ')}</p>
                                </div>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
