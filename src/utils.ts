import { d_pronouns, voyelles } from "./Data/defaults";

export const shuffle = (array: any[]) => {
  let tempArray = [...array]

  let currentIndex = tempArray.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    // let temp = array[currentIndex]
    // array[currentIndex] = array[randomIndex]
    // array[randomIndex] = temp
    [tempArray[currentIndex], tempArray[randomIndex]] = [
      tempArray[randomIndex], tempArray[currentIndex]];
  }

  return tempArray;
}

export const randElement = (array: any[], max?: number) => {
  if (max) {
    return array[Math.floor(Math.random() * max)]
  } else {
    return array[Math.floor(Math.random() * array.length)]
  }
}

export const findPronoun = (word: string, pronounPos: number) => {
  if (word) {
    if (pronounPos === 0) {
      return voyelles.includes(word[0]) ? "j'" : "je "
    } else {
      return d_pronouns[pronounPos][0] + " "
    }
  } else return ""
}