const fetchGravatarAPI = async (email) => {
  const response = await fetch(`https://www.gravatar.com/avatar/${email}`);
  return response.url;
};

export default fetchGravatarAPI;
