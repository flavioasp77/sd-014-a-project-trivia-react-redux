const correct = 'correct-answer';
// Função para randomizar array
export function shuffleArray(arr) {
  // Loop em todos os elementos
  for (let i = arr.length - 1; i > 0; i -= 1) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Retornando array com aleatoriedade
  return arr;
}

export function sumScore(id, timer, difficulty) {
  const ten = 10;
  const easy = 1;
  const medium = 2;
  const hard = 3;
  const incorrect = 0;
  if (id === correct) {
    switch (difficulty) {
    case 'easy':
      return ten + (timer * easy);
    case 'medium':
      return ten + (timer * medium);
    case 'hard':
      return ten + (timer * hard);
    default:
      break;
    }
  }
  return incorrect;
}

export function sumAssertions(id) {
  if (id === correct) {
    return 1;
  }
  return 0;
}

export function filtraEstadoGameScreen(state) {
  const { alternativesShuffled,
    visibleButton,
    className,
    timer,
    timeDisableButton,
    idInterval } = state;
  return { alternativesShuffled,
    visibleButton,
    className,
    timer,
    timeDisableButton,
    idInterval };
}
