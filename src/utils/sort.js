import dayjs from "dayjs";

// сортирует от самого нового к самому старому
export const sortFilmsByDate = (a, b) => dayjs(b.date).diff(dayjs(a.date));
// сортирует по убыванию рейтинга
export const sortFilmsByRating = (a, b) => b.rating - a.rating;
