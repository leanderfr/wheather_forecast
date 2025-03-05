
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

import Header from "@components/Header";
import { useEffect } from 'react';

const RootLayout = () => {

  const [fontLoaded, loadError] = useFonts( {
    Roboto: require('@fonts/RobotoRegular.ttf')
  })

  useEffect(() => {
    if (fontLoaded) {
      console.log('carregou');
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, loadError]);

  if (!fontLoaded || loadError)  {
    return null;
  }

  return <Stack 
    screenOptions={ {
      header: Header,
    }} >;

    <Stack.Screen name='index'  options={{title: 'Home'}}  />



    </Stack>
}



//**********************************************************************
//**********************************************************************
export default RootLayout;
