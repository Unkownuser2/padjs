export function splitPascalCase(word) {
  return word.match(/($[a-z])|[A-Z][^A-Z]+/g).join(' ');
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function discardLastWord(string) {
  return string.substring(0, string.lastIndexOf(' '));
}
