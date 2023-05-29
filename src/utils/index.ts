export const handleError = (e: unknown) => {
  let error;
  if (typeof e === 'string') {
    error = e.toUpperCase();
  } else if (e instanceof Error) {
    error = e.message;
  }

  throw new Error(error);
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .trim()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
