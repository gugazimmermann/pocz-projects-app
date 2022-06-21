export function formatText(lang: string, content: string[]): string {
  const langArray = lang.split('*');
  if (content.length === 1) return `${langArray[0]}${content[0]}${langArray[1]}`;
  if (content.length === 2) return `${langArray[0]}${content[0]}${langArray[1]}${content[1]}${langArray[2] ? langArray[2] : ''}`;
  return '';
}
