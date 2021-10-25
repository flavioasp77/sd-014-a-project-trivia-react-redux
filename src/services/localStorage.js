export const saveToken = (token) => localStorage.setItem('token', token);

export const getLocalToken = () => localStorage.getItem('token');

export const savePlayerEmail = (gravatarEmail, name, score = 0) => {
  const player = {
    player: {
      name,
      assertions: 0,
      score,
      gravatarEmail,
    },
    // rank: {
    //   player0: {
    //     name,
    //     score,
    //     gravatarEmail,
    //   },
    // },
  };
  localStorage.setItem('state', JSON.stringify(player));
};

export const getStateFromStorage = () => JSON.parse(localStorage.getItem('state'));

export const savePlayerScore = (player) => {
  const playerFuture = {
    player,
  };
  localStorage.setItem('state', JSON.stringify(playerFuture));
};

// export const savePlayerAssertions = (assertions) => {
//   const playerFuture = {
//     assertions,
//   };
//   localStorage.setItem('state', JSON.stringify(playerFuture));
// };
