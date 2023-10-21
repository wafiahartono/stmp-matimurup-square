import { Square, styled } from "tamagui";

export default styled(Square, {
  animation: "tile",
  animateOnly: ["transform"],
  size: 100,
  br: 8,
  backgroundColor: "$gray8",
  scale: 1,
  variants: {
    blink: {
      true: {
        backgroundColor: "$green8",
        scale: 0.95,
      },
    },
    enabled: {
      true: {
        pressStyle: {
          backgroundColor: "$blue8",
          scale: 0.95,
        },
      },
    },
    state: {
      win: {
        backgroundColor: "$green8",
        scale: 0.95,
      },
      lose: {
        backgroundColor: "$red8",
        scale: 0.95,
      },
    },
    finished: {
      true: {
        backgroundColor: "$gray2",
      },
    },
  },
})
