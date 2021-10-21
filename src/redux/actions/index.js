export const CASO_1 = 'CASO_1';
export const GERAR_QUESTOES = 'GERAR_QUESTOES';

export const funcCaso1 = () => {
  //
};

export const gerarPerguntas = (payload) => ({
  type: GERAR_QUESTOES,
  payload,
});
