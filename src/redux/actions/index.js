import fetchGravatar from '../../services/fetchGravatar';
import fetchToken from '../../services/fetchToken';

export const SAVE_USERINFO = 'SAVE_USERINFO';

export const saveUserInfoAction = (localState) => async (dispatch) => {
  const { name, assertions, score, gravatarEmail } = localState;
  const token = await fetchToken();
  const thumbnail = fetchGravatar();

  const payload = {
    name,
    assertions,
    score,
    gravatarEmail,
    thumbnail,
    token,
  };

  dispatch({
    type: SAVE_USERINFO,
    payload,
  });
};
