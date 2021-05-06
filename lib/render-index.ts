export const renderIndex = (): string => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="195" height="45" fill="#fff" role="img" style="border-radius: 10px; border: 5px solid black;">
<foreignObject x="0" y="-5" width="200" height="50">
<p xmlns="http://www.w3.org/1999/xhtml" style="font-size: 0.5em;">
  Welcome to <code>pokedex.deno.dev</code>!
  Visit any Pokémon by appending its name or pokédex number like so:
  <code>pokedex.deno.dev/porygon</code> or <code>pokedex.deno.dev/150</code>.
  Visit a random Pokémon by following <code>pokedex.deno.dev/random</code>.
</p>
</foreignObject>
</svg>`;
};
