export interface PokedexEntry {
  name: string;
  species: string;
  entry: string;
}

let requestsRecieved = 0;
let requestsFetchedFromCache = 0;
const entries = new Map<string, PokedexEntry>();

export const getPokedexEntry = async (
  pokemon: string,
  language: string = "en",
): Promise<PokedexEntry | null> => {
  logMetrics();
  const lowerCasePokemon = pokemon.toLowerCase();
  if (entries.has(lowerCasePokemon)) {
    requestsFetchedFromCache++;
    return entries.get(lowerCasePokemon) ?? null;
  }
  try {
    const data = await fetchPokedexData(pokemon);
    const formattedData = formatPokedexData(data, language);
    entries.set(lowerCasePokemon, formattedData);
    return formattedData;
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

const logMetrics = () => {
  if (requestsRecieved++ % 10 === 0) {
    console.log({
      requestsFetchedFromCache,
      requestsRecieved,
      ratio: requestsFetchedFromCache * 100 / requestsRecieved,
    });
  }
};