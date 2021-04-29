import { getPokedexEntry } from "./lib/get-pokedex-entry.ts";
import { renderPokedexEntry } from "./lib/render-pokedex-entry.ts";

addEventListener("fetch", async (event) => {
  let result = "{}";
  const { pathname } = new URL(event.request.url);
  const data = await getPokedexEntry(pathname);
  if (data !== null) {
    // result = JSON.stringify(data);
    result = renderPokedexEntry(data.name, data.species, data.entry);
  }
  // const response = new Response(result, {
  //   headers: { "content-type": "application/json" }, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#png
  // });
  const response = new Response(result, {
    headers: { "content-type": "image/svg+xml" }, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#png
  });
  event.respondWith(response);
});
