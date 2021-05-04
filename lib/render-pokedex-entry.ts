export const renderPokedexEntry = (
  name: string,
  species: string,
  entry: string,
): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="195" height="45" fill="#fff" role="img" style="border-radius: 10px; border: 5px solid black;">
<text fill="#000" x="2" y="13" style="font-size: 1rem;">${name}</text>
<text fill="#000" x="2" y="25" style="font-size: 0.5rem;">The ${species}</text>
<foreignObject x="90" y="-5" width="100" height="200">
<p xmlns="http://www.w3.org/1999/xhtml" style="font-size: 0.5em;">${entry}</p>
</foreignObject>
</svg>`;
