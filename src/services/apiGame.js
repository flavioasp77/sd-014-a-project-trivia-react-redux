export default async function getGame(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const game = await response.json();
  return game.results;
}
