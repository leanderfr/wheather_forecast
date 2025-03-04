import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Rubik_400Regular,
} from '@expo-google-fonts/rubik';

import Header from "@components/header";

const RootLayout = () => {


  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
  });


  return <Stack 
    screenOptions={ {
      header: Header,
    }} >;

    {/* titulo diferenciado para cada pagina */}
    <Stack.Screen name='index'  options={{title: 'Home'}}  />



    </Stack>
}



//**********************************************************************
//**********************************************************************
export default RootLayout;
