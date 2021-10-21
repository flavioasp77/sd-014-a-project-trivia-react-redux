const saveTokenInLocalStorage = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
};

export default saveTokenInLocalStorage;
