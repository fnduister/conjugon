export interface Verb {
  infinitif: string;
  participePasse: string;
  participePresent: string;
  auxiliaire: string;
  present: string[];
  imparfait: string[];
  passeSimple: string[];
  futureSimple?: string[];
  plusQueParfait: string[];
  passeAnterieur: string[];
  futurAnterieur: string[];
  subjonctifPasse: string[];
  imperatif: string[];
  passeCompose: string[];
  subjonctifPlusQueParfait: string[];
  conditionnelPasse: string[];
  subjonctifPresent: string[];
  conditionnelPasseII: string[];
  imperatifPasse: string[];
  conditionnelPresent: string[];
  formePronominale?: string | undefined;
  subjonctifImparfait?: string[] | undefined;
  formeNomPronomiale?: string | undefined
}

export interface GroupInfo {
  title: string;
  data: string[];
}

export interface RaceGameInfo {
  pronoun: string;
  word: string;
  visibleTenses: string[];
  stepTense: string;
}

export interface UpdateHeader {
  update: boolean;
  target: string;
}

export interface FindErrorGameInfo {
  visibleWords: string[];
  error: string;
  stepTense: string;
}

export interface CompleteGameInfo {
  visiblePronouns: string[];
  stepVerb: string;
  stepTable: string[];
  stepTense: string;
}

export interface GameInfo {
  img: string;
  difficulty: string;
  title: string;
  rows: number;
  url: string;
  cols: number;
  featured: boolean;
}

export interface OngoingGameInfo {
  isOn: boolean
  maxStep: number;
  currentStep: number;
  maxTime: number;
  score: number;
  maxScore: number;
}

export interface UserInfo {
  first: string;
  last: string;
  avatar: string;
  grade: string;
};

export interface Pronoun {

}