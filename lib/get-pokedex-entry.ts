export interface PokedexEntry {
  name: string;
  species: string;
  entry: string;
}

const entries = new Map<string, PokedexEntry>();

export const getPokedexEntry = async (
  pokemon: string,
  language: string = "en",
): Promise<PokedexEntry | null> => {
  if (entries.has(pokemon.toLocaleLowerCase())) {
    return entries.get(pokemon.toLowerCase()) ?? null;
  }
  try {
    const data = await fetchPokedexData(pokemon);
    return formatPokedexData(data, language);
  } catch {
    return null;
  }
};

const fetchPokedexData = async (pokemon: string): Promise<any> => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const formatPokedexData = (data: any, language: string): PokedexEntry => {
  const { name } = findByLanguage(data.names, language);
  const { genus: species } = findByLanguage(data.genera, language);
  const { flavor_text: entry } = findByLanguage(
    data.flavor_text_entries,
    language,
  );
  return { name, species, entry: entry.replace(/\n|\f/g, " ") };
};

const findByLanguage = (data: any[], language: string) =>
  data.find((entry: any) => entry.language.name === language);
