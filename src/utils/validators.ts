const regexp = /^[A-Z][A-Za-z]{4,14}$/;

export const validateUsername = (username: string) => username.match(regexp);
