import React, { useEffect, useState } from "react"

import { Difficulty, DifficultySettings } from "../utils/settings"
import { useSession } from "./session"

export enum RoundState {
  Ready, Memorize, Play, Win, Lose, Finished
}

export interface GameContext {
  round: number
  roundState: RoundState
  blinking: number
  score: number
  check(tile: number): void
}

const GameContext = React.createContext<GameContext | null>(null) as React.Context<GameContext>

export function useGame() {
  return React.useContext(GameContext)
}

export type GameProviderProps = {
  children: any
  rounds: number
  difficulty: Difficulty
}

export function GameProvider(props: GameProviderProps) {
  const { data, endSession, saveHistory } = useSession()

  const { numberOfTiles, intervalTime, scoreMultiplier } = DifficultySettings[props.difficulty]

  const [roundTimeout, setRoundTimeout] = React.useState<NodeJS.Timeout>()
  const [tileInterval, setTileInterval] = React.useState<NodeJS.Timeout>()

  const [round, setRound] = React.useState(1)
  const [roundState, setRoundState] = React.useState<RoundState>(RoundState.Ready)

  const [sequence, setSequence] = React.useState<Array<number>>([])

  const [blinkerTick, setBlinkerTick] = React.useState(0)

  const blinking = blinkerTick == 0 || blinkerTick > numberOfTiles ? 0 : sequence[blinkerTick - 1]

  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    startRound()

    return () => {
      clearTimeout(roundTimeout)
      clearInterval(tileInterval)
    }
  }, [])

  React.useEffect(() => {
    let timeout: NodeJS.Timeout

    if (roundState == RoundState.Play) {
      setBlinkerTick(0)
    } else if (roundState == RoundState.Win || roundState == RoundState.Lose) {
      timeout = setTimeout(() => nextRound(), 1500)
    }

    return () => clearTimeout(timeout)
  }, [roundState])

  React.useEffect(() => {
    if (blinkerTick <= numberOfTiles) return

    clearInterval(tileInterval)
    setTileInterval(undefined)
    setRoundState(RoundState.Play)
  }, [blinkerTick])

  function startRound() {
    setRoundState(RoundState.Ready)

    setSequence(
      [...Array(numberOfTiles).keys()].map((_, index, array) => {
        let random
        do {
          random = Math.floor(Math.random() * 9) + 1
        } while (array[index - 1] == random)
        array[index] = random
        return random
      })
    )

    setRoundTimeout(
      setTimeout(() => {
        setRoundState(RoundState.Memorize)
        startBlinker()
      }, 1500)
    )
  }

  function startBlinker() {
    setTileInterval(
      setInterval(() => setBlinkerTick(tick => tick + 1), intervalTime)
    )
  }

  function checkSequence(tile: number) {
    if (roundState != RoundState.Play) return

    if (sequence[0] == tile) {
      if (sequence.length > 1) {
        setSequence(sequence => sequence.slice(1))
      } else {
        setRoundState(RoundState.Win)
        setScore(score => score + 10 * scoreMultiplier)
      }
    } else {
      setRoundState(RoundState.Lose)
    }
  }

  function nextRound() {
    if (round == props.rounds) {
      setRoundState(RoundState.Finished)

      if (score > 0) {
        setTimeout(() => {
          saveHistory({
            handle: data!!.handle,
            rounds: data!!.rounds,
            difficulty: data!!.difficulty,
            score: score,
          }
          ).then(() => endSession())
        }, 1500)
      } else {
        endSession()
      }
    } else {
      setRound(round => round + 1)
      startRound()
    }
  }

  return (
    <GameContext.Provider
      value={{
        round: round,
        roundState: roundState,
        blinking: blinking,
        score: score,
        check: checkSequence,
      }}>
      {props.children}
    </GameContext.Provider>
  )
}
