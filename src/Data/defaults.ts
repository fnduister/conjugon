import error from '../Assets/imgs/error.jpg'
import order from '../Assets/imgs/order.jpg'
import tables from '../Assets/imgs/tables.avif'
import race from '../Assets/imgs/course.png'

import { SpriteMap } from 'use-sound/dist/types';

export const VerbToText = {
  infinitif: "infinitif",
  participePasse: "participe passé",
  participePresent: "participe présent",
  auxiliaire: "auxiliaire",
  present: "présent",
  imparfait: "imparfait",
  passeSimple: "passé simple",
  futurSimple: "futur simple",
  plusQueParfait: "plus-que-parfait",
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

export const positifEndgameSpriteMap: SpriteMap = {
  'ss1': [0, 3000],
  'ss2': [3000, 3000],
  'ss3': [6000, 3000],
  'ss4': [12000, 3000],
  'ss5': [15000, 3000],
  'ss6': [18000, 3000],
  'ss7': [21000, 3000],
  'ss8': [24000, 3000],
  'ss9': [27000, 3000],
  'ss10': [30000, 3000]
};

export const positifEndgameKeys = ['ss1', 'ss2', 'ss3', 'ss4', 'ss5', 'ss6', 'ss7', 'ss8', 'ss9', 'ss10']

export const negatifEndgameSpriteMap: SpriteMap = {
  'ss1': [0, 3000],
  'ss2': [3000, 3000],
  'ss3': [6000, 3000],
  'ss4': [9000, 3000],
  'ss9': [12000, 3000],
  'ss5': [15000, 3000],
  'ss6': [18000, 3000],
  'ss7': [21000, 3000],
  'ss8': [24000, 3000],
  'ss10': [27000, 3000],
  'ss11': [30000, 3000],
};

export const negatifEndgameKeys = ['ss1', 'ss2', 'ss3', 'ss4', 'ss5', 'ss6', 'ss7', 'ss8', 'ss9', 'ss10', 'ss11']

export const positifSpriteMap: SpriteMap = {
  'ss1': [0, 2000],
  'ss2': [3000, 2000],
  'ss3': [6000, 2000],
  'ss4': [12000, 2000],
  'ss5': [15000, 2000],
  'ss6': [18000, 2000],
  'ss7': [21000, 2000],
  'ss8': [27000, 2000],
  'ss9': [33000, 2000],
  'ss10': [36000, 2000],
  'ss11': [42000, 2000],
  'ss12': [48000, 2000]
};

export const positifKeys = ['ss1', 'ss2', 'ss3', 'ss4', 'ss5', 'ss6', 'ss7', 'ss8', 'ss9', 'ss10', 'ss11', 'ss12']

export const negatifSpriteMap:SpriteMap = {
  'ss1': [0, 1500],
  'ss2': [1500, 1500],
  'ss7': [3000, 1500],
  'ss3': [4500, 1500],
  'ss4': [6000, 1500],
  'ss5': [7500, 1500],
  'ss6': [9000, 1500],
};

export const negatifKeys = ['ss1', 'ss2', 'ss3', 'ss4', 'ss5', 'ss6', 'ss7']

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

  {
    img: order,
    difficulty: 'trop dure',
    title: 'Bouge moi',
    rows: 1,
    cols: 1,
    url: 'move-me',
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

export const speeds = [
  {name: "aucun", value: 0},
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
  { title: "Indicatif", data: ["imparfait", "plusQueParfait", "futurAnterieur"] },
  { title: "Conditionnel", data: ["conditionnelPresent", "conditionnelPasse"] },
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