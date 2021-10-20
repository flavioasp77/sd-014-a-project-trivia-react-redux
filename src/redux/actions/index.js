// Criar as Actions aqui

export function emailAction(newEmail) {
  return {
    type: 'NEW_EMAIL',
    newEmail,
  };
}

export function Temporario(texto) {
  return {
    type: 'TEMP',
    texto,
  };
}
