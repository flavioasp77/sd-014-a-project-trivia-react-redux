export const getRanking = () => JSON.parse(localStorage.getItem('ranking'));
export const setRanking = (rank) => { localStorage.ranking = JSON.stringify(rank); };
