import md5 from 'crypto-js/md5';

const gravatarImg = (email) => {
  const emailHash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${emailHash}`;
};

export default gravatarImg;
