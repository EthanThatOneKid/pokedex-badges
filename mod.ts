import { getPokedexEntry } from "./lib/get-pokedex-entry.ts";

addEventListener("fetch", async (event) => {
  let result = "{}";
  const { pathname } = new URL(event.request.url);
  const data = await getPokedexEntry(pathname);
  if (data !== null) {
    result = JSON.stringify(data);
  }
  const response = new Response(result, {
    headers: { "content-type": "application/json" }, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#png
  });
  event.respondWith(response);
});
