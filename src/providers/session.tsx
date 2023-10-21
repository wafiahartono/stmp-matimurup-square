import AsyncStorage from "@react-native-async-storage/async-storage"
import React from "react"

import { Difficulty } from "../utils/settings"

export interface SessionData {
  handle: string
  rounds: number
  difficulty: Difficulty
}

export interface History {
  handle: string
  rounds: number
  difficulty: Difficulty
  score: number
}

export interface SessionContext {
  data: SessionData | null
  finished: boolean
  startSession(data: SessionData): void
  endSession(): void
  resetSession(): void
  leaderboard: History[]
  saveHistory(history: History): Promise<void>
  clearHistory(): Promise<void>
}

const SessionContext = React.createContext<SessionContext | null>(null) as React.Context<SessionContext>

export function useSession() {
  return React.useContext(SessionContext)
}

export function SessionProvider(props: any) {
  const [data, setData] = React.useState<SessionData | null>(null)
  const [finished, setFinished] = React.useState(false)

  const [leaderboard, setLeaderboard] = React.useState<History[]>([])

  React.useEffect(() => {
    AsyncStorage.getItem("leaderboard").then(string => {
      setLeaderboard(JSON.parse(string ?? "[]"))
    })
  }, [])

  async function saveHistory(history: History) {
    const histories = [...leaderboard]

    const handleIndex = histories.findIndex(item => item.handle == history.handle)

    if (handleIndex >= 0) {
      if (histories[handleIndex].score <= history.score) {
        histories[handleIndex] = history
      }
    } else {
      histories.push(history)
    }

    histories.sort((a, b) => {
      const result = b.score - a.score
      return result == 0 ? b.handle.localeCompare(a.handle) : result
    })

    if (histories.length > 10) histories.splice(10)

    await AsyncStorage.setItem("leaderboard", JSON.stringify(histories))

    setLeaderboard(histories.map(x => x))
  }

  return (
    <SessionContext.Provider
      value={{
        data: data,
        finished: finished,
        startSession(data) { setData(data) },
        endSession() { setFinished(true) },
        resetSession() {
          setData(null)
          setFinished(false)
         },
        leaderboard: leaderboard,
        async saveHistory(history: History) {
          await saveHistory(history)
        },
        async clearHistory() {
          await AsyncStorage.removeItem("history")
          setLeaderboard([])
        },
      }}>
      {props.children}
    </SessionContext.Provider>
  )
}
