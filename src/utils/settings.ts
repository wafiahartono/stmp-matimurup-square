export enum Difficulty {
  Easy, Medium, Hard
}

interface Setting {
  numberOfTiles: number
  intervalTime: number
  scoreMultiplier: number
}

type DifficultySetting = {
  [key in Difficulty]: Setting
}

export const DifficultySettings: DifficultySetting = {
  [Difficulty.Easy]: {
    numberOfTiles: 5,
    intervalTime: 1000,
    scoreMultiplier: 10,
  },
  [Difficulty.Medium]: {
    numberOfTiles: 8,
    intervalTime: 800,
    scoreMultiplier: 30,
  },
  [Difficulty.Hard]: {
    numberOfTiles: 12,
    intervalTime: 600,
    scoreMultiplier: 50,
  },
}
