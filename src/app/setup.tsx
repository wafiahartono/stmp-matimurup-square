import { ArrowLeft, ArrowRight, Baby, Crown, Meh, Play } from "@tamagui/lucide-icons"
import React, { useEffect, useState } from "react"
import { Button, H1, H3, Input, ListItem, ListItemProps, Paragraph, Separator, Text, XStack, YGroup, YStack } from "tamagui"

import { useSession } from "../providers/session"
import randomName from "../utils/random-name"
import { Difficulty } from "../utils/settings"

type TextInputProps = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

function NameFragment(props: TextInputProps) {
  return (
    <YStack space>
      <H3 ta="center">
        Choose your handle, lad!
      </H3>

      <Input
        value={props.value}
        onChangeText={text => props.setValue(text)}
        theme="blue"
        size="$6"
        ta="center" />
    </YStack >
  )
}

function RoundsFragment(props: TextInputProps) {
  return (
    <YStack space>
      <H3 ta="center">How many rounds?</H3>

      <Input
        value={props.value}
        onChangeText={text => {
          if (text == "") {
            props.setValue("")
            return
          }

          let rounds = Number(text.replace(/\D/g, ""))
          rounds = rounds < 1 ? 1 : rounds > 10 ? 10 : rounds

          props.setValue(rounds.toString())
        }}
        inputMode="numeric"
        theme="blue"
        size="$6"
        ta="center" />
    </YStack>
  )
}

type DifficultyOptionProps = ListItemProps & {
  value: Difficulty
  selected: Difficulty
  setSelected: React.Dispatch<React.SetStateAction<Difficulty>>
}

function DifficultyOption(props: DifficultyOptionProps) {
  return (
    <YGroup.Item>
      <ListItem
        {...props}
        scaleIcon={1.5}
        theme={props.selected == props.value ? "active" : null}
        hoverTheme
        pressTheme
        onPress={() => props.setSelected(props.value)} />
    </YGroup.Item>
  )
}

const nextButtonTexts: { [key: number]: string } = {
  1: "Ready",
  2: "Set",
  3: "Play",
}

type DifficultyFragment = {
  value: Difficulty
  setValue: React.Dispatch<React.SetStateAction<Difficulty>>
}

function DifficultyFragment(props: DifficultyFragment) {
  return (
    <YStack space>
      <H3 ta="center">Prove thyself, King.</H3>

      <YGroup
        theme="blue"
        alignSelf="center"
        width={280}
        bordered
        separator={<Separator />}
      >
        <DifficultyOption
          value={Difficulty.Easy}
          selected={props.value}
          setSelected={props.setValue}
          title="Easy"
          subTitle="5 tiles, 1000ms"
          icon={Baby} />

        <DifficultyOption
          value={Difficulty.Medium}
          selected={props.value}
          setSelected={props.setValue}
          title="Medium"
          subTitle="8 tiles, 800ms"
          icon={Meh} />

        <DifficultyOption
          value={Difficulty.Hard}
          selected={props.value}
          setSelected={props.setValue}
          title="Hard"
          subTitle="Wanna find out?"
          icon={Crown} />
      </YGroup>
    </YStack>
  )
}

export default function () {
  const session = useSession()

  const [step, setStep] = useState(1)

  const [handle, setHandle] = useState(randomName())
  const [rounds, setRounds] = useState("3")
  const [difficulty, setDifficulty] = useState(Difficulty.Easy)

  const lastStep = step == 3

  return (
    <YStack f={1} ai="center" jc="space-between" py="$16">
      <H1>
        Welcome to{" "}
        <Text color="$gray8">Mati</Text>
        <Text color="$blue10">Murup</Text>
        <Text color="$blue8">²</Text>
      </H1>

      <YStack ai="center" space="$8">
        {step == 1 && <NameFragment value={handle} setValue={setHandle} />}
        {step == 2 && <RoundsFragment value={rounds} setValue={setRounds} />}
        {step == 3 && <DifficultyFragment value={difficulty} setValue={setDifficulty} />}

        <XStack space>
          {step > 1 && (
            <Button
              onPress={() => setStep(step => step - 1)}
              variant="outlined"
              size="$6"
              icon={ArrowLeft}
            >
              Oops
            </Button>
          )}

          <Button
            onPress={() => {
              if (lastStep) session.startSession({
                handle: handle,
                rounds: Number(rounds),
                difficulty: difficulty,
              })
              else setStep(step => step + 1)
            }}
            theme="blue"
            size="$6"
            iconAfter={lastStep ? Play : ArrowRight}
          >
            {nextButtonTexts[step]}
          </Button>
        </XStack>
      </YStack>

      <Paragraph>Made with ♥️ by 160419098</Paragraph>
    </YStack>
  )
}
