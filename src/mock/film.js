import dayjs from "dayjs";


const MAX_NUM_SEN_SHORT_DESCRIPTION = 5;
const MIN_NUM_SEN_FULL_DESCRIPTION = 5;
const MAX_NUM_SEN_FULL_DESCRIPTION = 11;
const MAX_HOURS_DURATION = 2;
const MAX_MIN_DURATION = 59;
const MAX_NUM_OF_COMMENTS = 5;
const MIN_NUM_OF_RATING = 7;
const MAX_NUM_OF_RATING = 10;
const FILMS_AGE_RATING_MULTIPLY = 4;
const MAX_NUM_OF_GENRE = 3;
const FILMS_GENRE = [
  `Action`,
  `Comedy`,
  `Drama`,
  `Fantasy`,
  `Horror`,
  `Mystery`,
  `Romance`,
  `Thriller`
];
const FILM_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const FILMS_POSTER = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];
const FILMS_TITLE = [
  `Raging Bull`,
  `Amelie`,
  `Titanic`,
  `Good Will Hunting`,
  `Arrival`
];
const FILMS_PRODUCER = [
  `Michael Mann`,
  `James Cameron`,
  `Steven Spielberg`,
  `Spike Lee`,
  `Tony Scott`,
  `John Singleton`,
  `Richard Donner`,
  `Quentin Tarantino`,
  `George Lucas`,
  `Martin Scorsese`,
  `Jerry Bruckheimer`,
  `Jim Henson`
];
const FILMS_SCREENWRITER = [
  `Billy Wilder`,
  `Joel Coen`,
  `Robert Towne`,
  `Quentin Tarantino`,
  `Francis Ford Coppola`,
  `William Goldman`,
  `Charlie Kaufman`,
  `Quentin Tarantino`,
  `Woody Allen`,
  `Nora Ephron`,
  `Ernest Lehman`,
  `Jim Henson`
];
const FILMS_COUNTRY = [
  `Germany`,
  `France`,
  `United Kingdom`,
  `Thailand`,
  `Italy`,
  `South Africa`,
  `South Korea`,
  `Russia`,
  `USA`
];
const FILMS_CAST = [
  `Johnny Depp, Al Pacino, Robert De Niro`,
  `Kevin Spacey, Denzel Washington, Russell Crowe`,
  `Johnny Depp, Brad Pitt, Angelina Jolie`
];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const NUM_OF_COMMENTS = getRandomInteger(0, MAX_NUM_OF_COMMENTS);

const generateTitle = () => {
  return FILMS_TITLE[getRandomInteger(0, FILMS_TITLE.length - 1)];
};

const generatePoster = () => {
  return FILMS_POSTER[getRandomInteger(0, FILMS_POSTER.length - 1)];
};

const generateProducer = () => {
  return FILMS_PRODUCER[getRandomInteger(0, FILMS_PRODUCER.length - 1)];
};

const generateScreenwriter = () => {
  return FILMS_SCREENWRITER[getRandomInteger(0, FILMS_SCREENWRITER.length - 1)];
};

const generateCountry = () => {
  return FILMS_COUNTRY[getRandomInteger(0, FILMS_COUNTRY.length - 1)];
};

const generateCast = () => {
  return FILMS_CAST[getRandomInteger(0, FILMS_CAST.length - 1)];
};

const generateGenreCard = () => {
  return FILMS_GENRE[getRandomInteger(1, FILMS_GENRE.length - 1)];
};

const generateGenreDetails = () => {
  let detailsGenre = ``;
  for (let i = 0; i < getRandomInteger(1, MAX_NUM_OF_GENRE); i++) {
    detailsGenre += `<span class="film-details__genre">${FILMS_GENRE[getRandomInteger(0, FILMS_GENRE.length - 1)]}</span>`;
  }
  return detailsGenre;
};

const generateAgeRating = () => {
  return getRandomInteger(1, FILMS_AGE_RATING_MULTIPLY) * FILMS_AGE_RATING_MULTIPLY + `+`;
};

const generateDuration = () => {
  return `${getRandomInteger(0, MAX_HOURS_DURATION)}h ${getRandomInteger(0, MAX_MIN_DURATION)}m`;
};

const generateDescription = () => {
  const numOfSentence = getRandomInteger(1, MAX_NUM_SEN_SHORT_DESCRIPTION);
  let filmDescription = ``;

  for (let i = 0; i < numOfSentence; i++) {
    filmDescription += FILM_DESCRIPTIONS[getRandomInteger(0, FILM_DESCRIPTIONS.length - 1)] + ` `;
  }
  return filmDescription;
};

const generateFullDescription = () => {
  const numOfSentence = getRandomInteger(MIN_NUM_SEN_FULL_DESCRIPTION, MAX_NUM_SEN_FULL_DESCRIPTION);
  let filmDescription = ``;

  for (let i = 0; i < numOfSentence; i++) {
    filmDescription += FILM_DESCRIPTIONS[getRandomInteger(0, FILM_DESCRIPTIONS.length - 1)] + ` `;
  }
  return filmDescription;
}

const generateDate = () => {
  return dayjs().add(getRandomInteger(1, 5), `h`).format(`YYYY/MM/DD hh:mm`);
};

const generateFilmComments = (numOfComments) => {
  let filmComments = [];
  const commentText = [
    `Good film`,
    `Amazing movie`,
    `That's awesome film`,
    `I don't like this film`,
    `Bad picture`
  ];

  const commentEmotionals = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];

  const commentAuthors = [
    `Andy`,
    `Carl`,
    `Veofold`
  ];

  let commentDates = [];
  for (let i = 0; i < numOfComments; i++) {
    commentDates.push(generateDate());
  }

  for (let i = 0; i < numOfComments; i++) {
    const filmComment = {
      text: commentText[getRandomInteger(0, commentText.length - 1)],
      emotion: commentEmotionals[getRandomInteger(0, commentEmotionals.length - 1)],
      author: commentAuthors[getRandomInteger(0, commentAuthors.length - 1)],
      date: commentDates[getRandomInteger(0, commentDates.length - 1)]
    };
    filmComments.push(filmComment);
  }
  return filmComments;
};

export const generateFilm = () => {
  let date = dayjs().day(getRandomInteger(1, 364)).subtract(getRandomInteger(1, 67), `year`);
  return {
    poster: generatePoster(),
    title: generateTitle(),
    originalTitle: generateTitle(),
    rating: getRandomInteger(MIN_NUM_OF_RATING, MAX_NUM_OF_RATING),
    producer: generateProducer(),
    screenwriters: generateScreenwriter(),
    cast: generateCast(),
    release: date.format(`YYYY`),
    date: date.format(`DD MMMM YYYY`),
    duration: generateDuration(),
    country: generateCountry(),
    genre: generateGenreCard(),
    genreDetails: generateGenreDetails(),
    shortDescription: generateDescription(),
    fullDescription: generateFullDescription(),
    ageRating: generateAgeRating(),
    comments: generateFilmComments(NUM_OF_COMMENTS),
    numOfComments: NUM_OF_COMMENTS,
  };
};
