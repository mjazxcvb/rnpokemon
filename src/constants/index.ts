type KeyValue = Record<string, any>;

export const typeColors: KeyValue = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export const errorMessage: KeyValue = {
  empty: 'Please fill out this field',
  email: 'Invalid email address',
  password: 'Password must be atleast 6 characters',
  emailExists: 'Email already exists.',
  noMatch: 'Email/Password is incorrect. Check your details and try again.',
};
