export function getUserInitials(name: string | undefined) {
  if (name) {
    const splitMame = name.trim().split(' ');
    if (splitMame.length === 1) return splitMame[0][0];
    return `${splitMame[0][0]}${splitMame[splitMame.length - 1][0]}`;
  }
  return '.';
}
