/*import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PokeAPI } from "./api";
*/


type Props = {
    id: number 
    image: string
    name: string
    types: string[]
}

function Card(prop: Props) {
  return <div>
    {prop.id}
    {prop.name}

    <img src={prop.image} />
    
    </div>
}

export function Root() {
  return <Card
    id={0}
    image="https://placeholdit.com/400/dddddd/999999"
    name="Pikachu"
    types={["grass"]}
    />
}

/*
interface PokemonCard {
  id: number;
  image: string;
  name: string;
  types: string[];
}

async function fetchData(offset: number): Promise<PokemonCard[]> {
  const list = await PokeAPI.listPokemons(offset, 20);
  const pokemons = await Promise.all(
    list.results.map(async (item: { name: string; url: string }) => {
      const pokemon = await PokeAPI.getPokemonByName(item.name);
      return pokemon;
    }),
  );

  return pokemons.map((item) => ({
    id: item.id,
    image: item.sprites.other?.["official-artwork"].front_default ?? "",
    name: item.name,
    types: item.types.map((type) => type.type.name),
  }));
}*/