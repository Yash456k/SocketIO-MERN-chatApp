export function hashString(str) {
  if (!str) return 0; // incase string is empty
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

export function stringToColor(str) {
  const hash = hashString(str);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 100%, 50%)`;
}
