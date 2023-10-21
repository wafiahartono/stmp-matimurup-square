import { DarkTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { TamaguiProvider, Theme } from "tamagui"

import tamaguiConfig from "../../tamagui.config"
import { SessionProvider } from "../providers/session"

SplashScreen.preventAutoHideAsync()

export default function () {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  })

  useEffect(() => {
    loaded && SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="dark">
        <ThemeProvider value={DarkTheme}>
          <SafeAreaView style={{ flex: 1 }}>
            <SessionProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </SessionProvider>
          </SafeAreaView>
        </ThemeProvider>
      </Theme>
    </TamaguiProvider>
  )
}
