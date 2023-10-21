import { useState } from "react"
import { Button, Text, XStack, YStack } from "tamagui"

import { History, useSession } from "../providers/session"
import randomName from "../utils/random-name"
import { Difficulty, DifficultySettings } from "../utils/settings"

export function LeaderboardDebug() {
  const session = useSession()

  const [randomHistory, setRandomHistory] = useState<History>(generateHistory())

  function generateHistory(): History {
    const totalRounds = Math.floor(Math.random() * (10 + 1 - 3)) + 3

    let difficulty = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard][
      Math.floor(Math.random() * 3)
    ]

    return {
      handle: randomName(),
      rounds: totalRounds,
      difficulty: difficulty,
      score: 10 * DifficultySettings[difficulty].scoreMultiplier * totalRounds,
    }
  }

  return (
    <>
      <YStack>
        <Text>{randomHistory.handle}</Text>
        <Text>{randomHistory.rounds}</Text>
        <Text>{Difficulty[randomHistory.difficulty]}</Text>
        <Text>{randomHistory.score}</Text>
      </YStack>
      <XStack space ai="center">
        <Button onPress={() => setRandomHistory(generateHistory())}>
          Generate
        </Button>
        <Button onPress={() => {
          randomHistory && session.saveHistory(randomHistory).then(() => {
            setRandomHistory(generateHistory())
          })
        }}
        >
          Save
        </Button>
        <Button onPress={() => {
          session.clearHistory()
        }}>
          Clear
        </Button>
      </XStack>
    </>
  )
}
