export interface PokedexEntry {
  name: string;
  species: string;
  entry: string;
}

let requestsRecieved = 0;
let requestsFetchedFromCache = 0;
const entries = new Map<string, PokedexEntry>();
const lastPokedexNumber = 898;

export const getPokedexEntry = async (
  pokemon: string,
  language: string = "en",
): Promise<PokedexEntry | null> => {
  logMetrics();
  pokemon = pokemon.slice(1).toLowerCase();
  if (pokemon === "random") {
    pokemon = String(
      Math.floor(Math.random() * lastPokedexNumber) + 1,
    );
  }
  if (entries.has(pokemon)) {
    requestsFetchedFromCache++;
    return entries.get(pokemon) ?? null;
  }
  try {
    const data = await fetchPokedexData(pokemon);
    const formattedData = formatPokedexData(data, language);
    entries.set(pokemon, formattedData);
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
