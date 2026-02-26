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
  return (
    <div>
      {prop.id} - {prop.name}
      <img src={prop.image} />
      <p>{prop.types.join(", ")}</p>
    </div>
  )
}

export function Root() {
  return (
    <div>
      {/* Prima Card */}
      <Card
        id={0}
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
        name="Pikachu"
        types={["grass"]}
      />

      <Card
        id={1}
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.pngg"
        name="charmander"
        types={["fire"]}
      />
    </div>
  )
}

function getTypeColor(type: string): string {
  return typeColors[type];
}

const typeColors: { [key: string]: string } = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  psychic: "bg-pink-500",
  ice: "bg-cyan-400",
  dragon: "bg-purple-700",
  dark: "bg-gray-700",
  fairy: "bg-pink-300",
  normal: "bg-gray-400",
  fighting: "bg-red-700",
  flying: "bg-indigo-400",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  rock: "bg-yellow-800",
  bug: "bg-green-700",
  ghost: "bg-indigo-700",
  steel: "bg-gray-500",
};

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