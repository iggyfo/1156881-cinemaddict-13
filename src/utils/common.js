export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const parseToMinAndHours = (minutes) => {
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes - hours * 60}m`;
};

