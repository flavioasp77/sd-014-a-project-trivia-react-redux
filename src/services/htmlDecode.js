export default function htmlDecode(input) {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
}
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
// Tip from Ivan Zignoi
