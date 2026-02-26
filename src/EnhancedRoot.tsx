type Props = {
  id: number
  image: string
  name: string
  types: string[]
}

function Card(prop: Props) {
  const typeColors: { [key: string]: string } = {
    fire: "#f87171",
    water: "#3b82f6",
    grass: "#4ade80",
    electric: "#facc15",
    psychic: "#f472b6",
    ice: "#67e8f9",
    dragon: "#7c3aed",
    dark: "#374151",
    fairy: "#fda4af",
    normal: "#9ca3af",
    fighting: "#b91c1c",
    flying: "#6366f1",
    poison: "#8b5cf6",
    ground: "#eab308",
    rock: "#b45309",
    bug: "#15803d",
    ghost: "#4f46e5",
    steel: "#6b7280",
  };

  function hexToRgb(hex: string) {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  function parseColorToRgb(color: string) {
    if (color.startsWith('#')) return hexToRgb(color);
    const m = color.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const parts = m[1].split(',').map((s) => parseFloat(s));
      return { r: parts[0] || 0, g: parts[1] || 0, b: parts[2] || 0 };
    }
    return { r: 255, g: 255, b: 255 };
  }

  function isDarkColor(col: string) {
    const { r, g, b } = parseColorToRgb(col);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum < 140;
  }

  // force all card backgrounds to light gray
  const bg = '#e5e7eb';
  const color = isDarkColor(bg) ? '#ffffff' : '#000000';
  // default pill overlay when specific type color not available
  const defaultPillOverlay = isDarkColor(bg) ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.08)';

  return (
    <div style={{
      background: bg,
      color,
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 6px 18px rgba(0,0,0,0.14)",
      width: 260,
      textAlign: "center",
      fontSize: 18,
    }}>
      <div style={{fontWeight: 800, marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 8}}>
        <span>{prop.name}</span>
        <span style={{fontSize: 14, fontWeight: 600, opacity: 0.9}}>#{prop.id}</span>
      </div>
      <img src={prop.image} style={{height: 180, display: "block", margin: "0 auto"}} />
      <div style={{marginTop: 12, display: 'flex', justifyContent: 'center', gap: 10}}>
        {prop.types.map((t) => {
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
        })}
      </div>
    </div>
  )
}

export function EnhancedRoot() {
  return (
    <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
      {/* Pikachu originale */}
      <Card
        id={25}
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
        name="Pikachu"
        types={["electric"]}
      />

      {/* Greninja */}
      <Card
        id={658}
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/658.png"
        name="Greninja"
        types={["water","dark"]}
      />

      {/* Charmander */}
      <Card
        id={4}
        image="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png"
        name="charmander"
        types={["fire"]}
      />
    </div>
  )
}
