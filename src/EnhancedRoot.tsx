import { useState, useEffect } from 'react';

type Props = {
  id: number
  image: string
  name: string
  types: string[]
}

function Card(prop: Props) {
  const typeColors: { [key: string]: string } = {
    fire: "#f87171", water: "#3b82f6", grass: "#4ade80", electric: "#facc15",
    psychic: "#f472b6", ice: "#67e8f9", dragon: "#7c3aed", dark: "#374151",
    fairy: "#fda4af", normal: "#9ca3af", fighting: "#b91c1c", flying: "#6366f1",
    poison: "#8b5cf6", ground: "#eab308", rock: "#b45309", bug: "#15803d",
    ghost: "#4f46e5", steel: "#6b7280",
  };

  function hexToRgb(hex: string) {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  }

  function isDarkColor(col: string) {
    const { r, g, b } = hexToRgb(col.startsWith('#') ? col : "#ffffff");
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum < 140;
  }

  const bg = '#e5e7eb';
  const color = '#000000';
  const defaultPillOverlay = 'rgba(0,0,0,0.08)';

  return (
    <div style={{
      background: bg,
      color,
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 6px 18px rgba(0,0,0,0.14)",
      textAlign: "center",
      fontSize: 18,
    }}>
      <div style={{fontWeight: 800, marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 8}}>
        <span style={{textTransform: 'capitalize'}}>{prop.name}</span>
        <span style={{fontSize: 14, fontWeight: 600, opacity: 0.9}}>#{prop.id}</span>
      </div>
      <img 
        src={prop.image} 
        style={{height: 150, width: 150, objectFit: 'contain', display: "block", margin: "0 auto"}} 
        alt={prop.name}
        loading="lazy"
      />
      <div style={{marginTop: 12, display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', minHeight: '32px'}}>
        {prop.types.length > 0 ? prop.types.map((t) => {
          const tb = typeColors[t] ?? defaultPillOverlay;
          const tColor = isDarkColor(tb) ? '#ffffff' : '#000000';
          return (
            <div key={t} style={{
              background: tb,
              color: tColor,
              padding: '6px 12px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              textTransform: 'capitalize'
            }}>{t}</div>
          )
        }) : <div style={{opacity: 0.3, fontSize: 12}}>Caricamento tipi...</div>}
      </div>
    </div>
  )
}

export function EnhancedRoot() {
  const [pokemonList, setPokemonList] = useState<Props[]>([]);
  const TOTAL_POKEMON = 1025;
  const BATCH_SIZE = 20;

  useEffect(() => {
    const fetchInBatches = async () => {
      // 1. Prima fase: Carichiamo velocemente la lista base (nomi e ID)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`);
      const data = await res.json();
      
      const baseList = data.results.map((p: any, index: number) => ({
        id: index + 1,
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
        types: []
      }));
      
      setPokemonList(baseList);

      // 2. Seconda fase: Carichiamo i dettagli (tipi) a blocchi
      for (let i = 0; i < TOTAL_POKEMON; i += BATCH_SIZE) {
        const batch = baseList.slice(i, i + BATCH_SIZE);
        
        const updatedBatch = await Promise.all(batch.map(async (poke: any) => {
          try {
            const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.id}`);
            const detailData = await detailRes.json();
            return {
              ...poke,
              types: detailData.types.map((t: any) => t.type.name)
            };
          } catch (e) {
            return poke;
          }
        }));

        // Aggiorniamo lo stato man mano che i blocchi sono pronti
        setPokemonList(prev => {
          const newList = [...prev];
          updatedBatch.forEach((updatedPoke, index) => {
            newList[i + index] = updatedPoke;
          });
          return newList;
        });
      }
    };

    fetchInBatches();
  }, []);

  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", 
      gap: "28px",
      padding: "20px"
    }}>
      {pokemonList.map((poke) => (
        <Card key={poke.id} {...poke} />
      ))}
    </div>
  )
}