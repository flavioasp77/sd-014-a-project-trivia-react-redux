import md5 from 'crypto-js/md5';

const fetchGravatar = (gravatarEmail) => {
  const hash = md5(gravatarEmail).toString();
  const URL = `https://www.gravatar.com/avatar/${hash}`;

  return URL;
};

export default fetchGravatar;
