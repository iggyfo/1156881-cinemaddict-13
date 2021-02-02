import dayjs from "dayjs";

export const sortFilmsByDate = (a, b) => dayjs(b.release.date).diff(dayjs(a.release.date));
export const sortFilmsByRating = (a, b) => b.rating - a.rating;
