import { getAvatarURL } from './gameAPI';

export const localSaveItem = (key, item) => (
  localStorage.setItem(key, JSON.stringify(item))
);

export const localGetItem = (key) => JSON.parse(localStorage.getItem(key));

const decInsertSorted = (array, player) => {
  const left = array.filter(({ score }) => score >= player.score);
  const right = array.filter(({ score }) => score < player.score);
  return [...left, player, ...right];
};

export const updateRanking = (player) => {
  const ranking = localGetItem('ranking') || [];
  const newRanking = {
    name: player.name,
    score: player.score,
    picture: getAvatarURL(player.gravatarEmail),
  };
  localSaveItem('ranking', decInsertSorted(ranking, newRanking));
};
