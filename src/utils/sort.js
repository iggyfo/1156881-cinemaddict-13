import dayjs from "dayjs";

// сортирует от самого нового к самому старому
export const sortFilmsByDate = (a, b) => dayjs(b.release.date).diff(dayjs(a.release.date));
// сортирует по убыванию рейтинга
export const sortFilmsByRating = (a, b) => b.rating - a.rating;
