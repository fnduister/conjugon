import error from '../Assets/imgs/error.jpg'
import order from '../Assets/imgs/order.jpg'
import tables from '../Assets/imgs/tables.avif'
import race from '../Assets/imgs/course.png'

export const VerbToText = {
  infinitif: "infinitif",
  participePasse: "participe passé",
  participePresent: "participe présent",
  auxiliaire: "auxiliaire",
  present: "présent",
  imparfait: "imparfait",
  passeSimple: "passé simple",
  futurSimple: "futur simple",
  plusQueParfait: "plus que parfait",
  passeAnterieur: "passé antérieur",
  futurAnterieur: "futur antérieur",
  subjonctifPasse: "subjonctif passé",
  imperatif: "imperatif",
  passeCompose: "passé composé",
  subjonctifPlusQueParfait: "subjonctif plus que parfait",
  conditionnelPasse: "conditionnel passé",
  subjonctifPresent: "subjonctif présent",
  conditionnelPasseII: "subjonctif passé",
  imperatifPasse: "imperatif passé",
  conditionnelPresent: "conditionnel présent",
  formePronominale: "forme pronominale",
  subjonctifImparfait: "subjonctif imparfait",
  formeNomPronomiale: "forme non pronomiale"
}

export const voyelles = ['e', 'o', 'y', 'a', 'i', 'u']

export const d_game =   {
  img: error,
  title: "Trouver l'erreur",
  difficulty: 'dure',
  rows: 1,
  cols: 1,
  url: 'find-error',
  featured: true,
}

export const d_games = [
  {
    img: error,
    title: "Trouver l'erreur",
    difficulty: 'dure',
    rows: 1,
    cols: 1,
    url: 'find-error',
    featured: true,
  },
  {
    img: tables,
    title: 'Conjugaison en gros',
    difficulty: 'moyen',
    rows: 1,
    cols: 1,
    url: 'complete',
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
  // {
  //   img: order,
  //   difficulty: 'trop dure',
  //   title: 'Aventure',
  //   rows: 1,
  //   cols: 1,
  //   url: 'order',
  //   featured: false,
  // },
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

export const speeds = [
  {name: "très lent", value: 500},
  {name: "lent", value: 275},
  {name: "normal", value: 175},
  {name: "rapide", value: 45},
  {name: "très rapide", value: 10}
]

export const d_ongoingGame = {
  currentStep: 1,
  maxStep: 5,
  maxTime: 175,
  isOn: false,
  score: 0,
  maxScore: 1
}

export const specialTenses = [
  "infinitif", "auxiliaire", "participePasse", "participePresent",
"imperatif", "imperatifPasse", "formePronominale", "formeNonPronominale"]

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
  { title: "semaine 1", data: ["courir", "voler"] },
  { title: "semaine 2", data: ["permettre", "manger"] },
  { title: "semaine 3", data: ["s'abattre", "se calmer"] },
]

export const d_presetVerbGroups = [
  { title: "facile", data: ["abattre", "danser"] },
  { title: "trop facile", data: ["avoir", "aller"] },
  { title: "dure", data: ["s'abattre", "se calmer"] },
]

export const tenses = []