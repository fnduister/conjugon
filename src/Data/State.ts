import { atom, selector } from 'recoil'
import conjugation from './conjugation.json'
import { GameInfo, GroupInfo, OngoingGameInfo, UserInfo, Verb } from './interfaces'
import { d_customTenseGroups, d_customVerbGroups, d_games, d_ongoingGame, d_presetTenseGroups, d_presetVerbGroups, d_user } from './defaults';

export const games = atom({
  key: 'games',
  default: d_games as GameInfo[]
})

export const conjugationTables = atom({
  key: 'conjugationTables',
  default: conjugation as Verb[]
})

export const tensesState = selector<string[]>({
  key: 'tenses',
  get: ({ get }) => {
    const verbTables: Verb[] = get(conjugationTables);
    return Object.keys(verbTables[0])
  },
})

export const verbsState = selector<string[]>({
  key: 'verbsState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    console.log("getting again")
    const verbTables: Verb[] = get(conjugationTables);
    return verbTables.map((verb) => verb.infinitif.normalize('NFD'))
  },
});

export const tenseGroupState = atom({
  key: 'tenseGroup',
  default: []
})

export const ongoingGameState = atom({
  key: 'ongoingGame',
  default: d_ongoingGame as OngoingGameInfo
})

export const currentGameState = atom({
  key: 'currentGame',
  default: {} as GameInfo
})

export const timerState = atom({
  key: 'timer',
  default: 0
})

export const currentUserState = atom({
  key: 'currentUser',
  default: d_user as UserInfo
})

export const currentVerbsState = atom({
  key: 'currentVerbs',
  default: [] as string[]
})

export const currentTensesState = atom({
  key: 'currentTenses',
  default: [] as string[]
})

export const currentCustomVerbGroupsState = atom({
  key: 'customVerbGroups',
  default: d_customVerbGroups as GroupInfo[]
})

export const currentPresetVerbGroupsState = atom({
  key: 'presetVerbGroups',
  default: d_presetVerbGroups as GroupInfo[]
})

export const currentCustomTenseGroupsState = atom({
  key: 'customTenseGroups',
  default: d_customTenseGroups as GroupInfo[]
})

export const currentPresetTenseGroupsState = atom({
  key: 'presetTenseGroups',
  default: d_presetTenseGroups as GroupInfo[]
})
