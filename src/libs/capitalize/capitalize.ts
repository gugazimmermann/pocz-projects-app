export function Capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function CapitalizePhrase(phrase: string): string {
  const arr = phrase.split(' ');
  for (let i = 0; i < arr.length; i += 1) arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  return arr.join(' ');
}
