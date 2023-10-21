import { StatusBar } from "expo-status-bar"

import { useSession } from "../providers/session"
import GameScreen from "./game"
import Leaderboard from "./leaderboard"
import SetupScreen from "./setup"

export default function () {
  const { data, finished } = useSession()

  return (
    <>
      <StatusBar style="auto" backgroundColor="black" />
      {
        finished ? <Leaderboard /> :
          data ? <GameScreen /> :
            <SetupScreen />
      }
    </>
  )
}
