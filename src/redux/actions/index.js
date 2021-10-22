import fetchGravatar from '../../services/fetchGravatar';

export const SAVE_USERINFO = 'SAVE_USERINFO';

// export const saveUserInfoAction = (payload) => ({
//   type: SAVE_USERINFO,
//   payload,
// });

export const saveUserInfoAction = (payload) => async (dispatch) => {
  const thumbnail = fetchGravatar();

  dispatch({
    type: SAVE_USERINFO,
    payload,
    thumbnail,
  });
};
