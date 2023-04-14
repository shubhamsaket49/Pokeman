import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


// Create a new Apollo Client instance
const client = new ApolloClient({
    link: createHttpLink({ uri: 'https://graphql-pokemon2.vercel.app/' }),
    cache: new InMemoryCache(),
});

// Define your GraphQL query
const GET_POKEMON_QUERY = gql`
  query getPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      height
      weight
      classification
      types
      weaknesses
      resistances
      evolutions {
        id
        name
        image
      }
    }
  }
`;

const PokemonDetail = ({ name }) => {
    const [showEvolutions, setShowEvolutions] = useState(false);
    const { loading, error, data } = useQuery(GET_POKEMON_QUERY, {
        variables: {
            name,
        },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const { id, image, height, weight, classification, types, weaknesses, resistances, evolutions } = data.pokemon;

    const handleShowEvolutions = () => {
        setShowEvolutions(!showEvolutions);
    };

    return (
        <div>
            <h1>Pokemon Detail</h1>
            <img src={image} alt={name} />
            <p>Number: {id}</p>
            <p>Name: {name}</p>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Classification: {classification}</p>
            <p>Types: {types.join(', ')}</p>
        </div>
    )
}
export default index;