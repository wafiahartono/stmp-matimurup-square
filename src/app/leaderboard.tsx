import { Button, Card, ColorTokens, H1, H2, H3, Paragraph, ScrollView, Text, Unspaced, XStack, YStack } from "tamagui";

import { useSession } from "../providers/session";
import { Difficulty } from "../utils/settings";
import { LeaderboardDebug } from "../debug/debug-components";

interface Leaderboard {
  rank: number
  handle: string
  rounds: number
  score: number
  difficulty: Difficulty
}

const difficultyColors: { [key in Difficulty]: ColorTokens } = {
  [Difficulty.Easy]: "$green9",
  [Difficulty.Medium]: "$orange9",
  [Difficulty.Hard]: "$red9",
}

function HistoryItem({ handle, item }: { handle: string, item: Leaderboard }) {
  return (
    <Card w="100%" bordered theme={item.handle == handle ? "blue" : null}>
      <Card.Header padded>
        <Paragraph lh="$1" space="$1.5">
          <Text fow="bold" color={difficultyColors[item.difficulty]}>
            {Difficulty[item.difficulty]}
          </Text>
          <Text>·</Text>
          <Text color="$gray10">{item.rounds} Rounds</Text>
        </Paragraph>
        <XStack ai="baseline" jc="space-between" space="$2">
          <H3 flex={1}>{item.handle}</H3>
          <H2 color="$gray10">{item.score}</H2>
        </XStack>
      </Card.Header>
      {item.rank == 1 &&
        <Text pos="absolute" t="$-2" right="$0" fos="$9">🥇</Text>}
      {item.rank == 2 &&
        <Text pos="absolute" t="$-2" right="$0" fos="$9">🥈</Text>}
      {item.rank == 3 &&
        <Text pos="absolute" t="$-2" right="$0" fos="$9">🥉</Text>}
      {item.rank > 3 &&
        <Paragraph pos="absolute" t="$1.5" right="$3" color="$gray8">#{item.rank}</Paragraph>}
    </Card>
  )
}

export default function () {
  const { data, resetSession, leaderboard } = useSession()

  return (
    <ScrollView>
      <YStack ai="center" space="$2" px="$4" pt="$16" pb="$4">
        {/* <Unspaced>
          <LeaderboardDebug />
        </Unspaced> */}
        <Unspaced>
          <Button
            onPress={() => resetSession()}
            variant="outlined"
          >
            Start new game
          </Button>
          <H1 mt="$2">Leaderboard</H1>
          <H3 mb="$8">10 of Our Bests</H3>
        </Unspaced>
        {leaderboard.map((history, index) =>
          <HistoryItem
            key={history.handle}
            handle={data?.handle ?? ""}
            item={{ rank: index + 1, ...history }} />
        )}
      </YStack>
    </ScrollView >
  )
}
