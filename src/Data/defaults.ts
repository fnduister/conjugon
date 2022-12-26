import error from '../Assets/imgs/error.jpg'
import order from '../Assets/imgs/order.jpg'
import tables from '../Assets/imgs/tables.avif'
import race from '../Assets/imgs/course.png'

export const d_games = [
  {
    img: error,
    title: "Trouver l'erreur",
    difficulty: 'dure',
    rows: 1,
    cols: 1,
    url: 'error',
    featured: true,
  },
  {
    img: tables,
    title: 'Conjugaison en gros',
    difficulty: 'moyen',
    author: '@rollelflex_graphy726',
    rows: 1,
    cols: 1,
    url: 'all',
    featured: true,
  },
  {
    img: race,
    title: 'Course contre la montre',
    difficulty: 'vraiment dure',
    rows: 1,
    cols: 2,
    url: 'race',
    featured: false,
  },
  {
    img: order,
    difficulty: 'trop dure',
    title: 'Aventure',
    rows: 1,
    cols: 1,
    url: 'order',
    featured: false,
  },
];

export const d_user = {
  first: "Your",
  last: "Name",
  avatar: "https://placekitten.com/g/200/200",
  grade: "4eme",
};

export const d_pronouns = [
  ['Je'],
  ['Tu'],
  ['Il', 'mael', 'adam', 'raf', 'jade'],
  ['Nous', 'Alexandre et moi', 'Jade et moi'],
  ['Vous', 'Fabrice et toi', 'Celine et toi', 'Baka billie et toi'],
  ['Ils/elles','Raf et Jade', 'Adam et Mael']
]

export const d_ongoingGame = {
  currentStep: 1,
  maxStep: 8,
  maxTime: .5,
  score: 0
}

export const d_customTenseGroups = [
  { title: "facile", data: ["present", "passeSimple"] },
{ title: "trop dure", data: ["plusQueParfait", "futurAnterieur"] }
]

export const d_presetTenseGroups = [
  { title: "subjonctif", data: ["subjonctifPresent", "subjonctifPasse", "subjonctifImparfait"] },
  { title: "Indicatif", data: ["Indicatif imparfait", "Indicatif plus-que-parfait", "Indicatif futur antérieur"] },
  { title: "Conditionnel", data: ["Conditionnel présent", "Conditionnel passé"] },
]

export const d_customVerbGroups = [
  { title: "semaine 1", data: ["courrir", "voler"] },
  { title: "semaine 2", data: ["permettre", "manger"] },
  { title: "semaine 3", data: ["s'abatter", "se calmer"] },
]

export const d_presetVerbGroups = [
  { title: "facile", data: ["abattre", "danser"] },
  { title: "trop facile", data: ["avoir", "aller"] },
  { title: "dure", data: ["s'abatter", "se calmer"] },
]

export const tenses = []