export const SIGN_IN = 'sign_in';
export const SIGN_OUT = 'sign_out';

// eslint-disable-next-line prettier/prettier
export const signIn = (accessToken) => ({
  type: SIGN_IN,
  data: accessToken,
});

export const signOut = () => ({
  type: SIGN_OUT,
});
