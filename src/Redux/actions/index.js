export default function addInfo(name, email, img) {
  return {
    type: 'ADD_USER',
    img,
    email,
    name,
  };
}
