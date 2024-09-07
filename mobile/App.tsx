import theme from "./src/theme";
import { ThemeProvider } from "styled-components"
import { StatusBar } from "react-native"

//Screens
import { Home } from '@screens/Home';
import { Loading } from "@components/Loading";

import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from "@expo-google-fonts/quicksand"

export default function App() {

  const [isFontsLoaded] = useFonts({ Quicksand_400Regular, Quicksand_700Bold, })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {isFontsLoaded ? <Home /> : <Loading />}
    </ThemeProvider>
  );
}