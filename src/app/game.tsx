import { Button, H2, H3, XStack, YStack } from "tamagui"

import Tile from "../components/Tile"
import { GameProvider, RoundState, useGame } from "../providers/game"
import { SessionContext, useSession } from "../providers/session"
import { DifficultySettings } from "../utils/settings"

const headingTexts: { [key in RoundState]: string } = {
  [RoundState.Ready]: "Get Ready",
  [RoundState.Memorize]: "Memorize the Tiles!",
  [RoundState.Play]: "Tap the Tiles in Order",
  [RoundState.Win]: "(～￣▽￣)～",
  [RoundState.Lose]: "(。>︿<)_θ",
  [RoundState.Finished]: "[]~(￣▽￣)~*"
}

function Layout() {
  const session = useSession()

  const { handle, difficulty } = session.data!!

  const { scoreMultiplier } = DifficultySettings[difficulty]

  const { round, roundState, blinking, score, check } = useGame()

  const tileEnabled = roundState == RoundState.Play

  const tileState =
    roundState == RoundState.Win ? "win" :
      roundState == RoundState.Lose ? "lose" : undefined

  const tileFinished = roundState == RoundState.Finished

  return (
    <YStack f={1} ai="center" jc="center">
      <H3 color="$gray10">Round {round}</H3>
      <H2 mt="$2" color="$blue10">{headingTexts[roundState]}</H2>

      <YStack space="$2" my="$8">
        <XStack space="$2">
          <Tile
            enabled={tileEnabled}
            blink={blinking == 1}
            state={tileState}
            finished={tileFinished}
            onPress={() => check(1)} />
          <Tile
            enabled={tileEnabled}
            blink={blinking == 2}
            state={tileState}
            finished={tileFinished}
            onPress={() => check(2)} />
          <Tile
            enabled={tileEnabled}
            blink={blinking == 3}
            state={tileState}
            finished={tileFinished}
            onPress={() => check(3)} />
        </XStack>
        <XStack space="$2">
          <Tile
            enabled={tileEnabled}
            blink={blinking == 4}
            state={tileState}
            finished={tileFinished}
            onPress={() => check(4)} />
          <Tile
            enabled={tileEnabled}
            blink={blinking == 5}
            state={tileState}
            finished={tileFinished}
            onPress={() => check(5)} />
          <Tile
            enabled={tileEnabled}
            blink={blinking == 6}
            state={tileState}
            finished={tileFinished}
            onPress={() => check(6)} />
        </XStack>
        <XStack space="$2">
          <Tile
            enabled={tileEnabled}
            blink={blinking == 7}
            state={tileState}
            finished={tileFinished}
            onPress={() => check(7)} />
          <Tile
            enabled={tileEnabled}
            blink={blinking == 8}
            state={tileState}
            finished={tileFinished}
            onPress={() => check(8)} />
          <Tile
            enabled={tileEnabled}
            blink={blinking == 9}
            state={tileState}
            finished={tileFinished}
            onPress={() => check(9)} />
        </XStack>
      </YStack>

      <XStack ai="center" space="$1">
        <H3>{score}</H3>
        {roundState == RoundState.Win &&
          <H3 color="$green10">+{10 * scoreMultiplier}</H3>
        }
      </XStack>

      <H2 color="$gray10">{handle}</H2>

      <Button
        onPress={() => session.resetSession()}
        variant="outlined"
        mt="$4"
      >
        Start new game
      </Button>
    </YStack>
  )
}

export default function () {
  const session = useSession()

  const { rounds, difficulty } = session.data!!

  return (
    <GameProvider rounds={rounds} difficulty={difficulty}>
      <Layout />
    </GameProvider>
  )
}
