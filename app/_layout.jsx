
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

import Header from "@components/Header";
import { useEffect } from 'react';

const RootLayout = () => {

  /* fonte mais bonita que o padrao */
  const [fontLoaded, loadError] = useFonts( {
    Roboto: require('@fonts/RobotoRegular.ttf')
  })

  /* efeito splash enqto carregando fonte */
  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, loadError]);

  if (!fontLoaded || loadError)  {
    return null;
  }

  /* o header vai ser definido em 'Header.jsx' */
  return <Stack 
    screenOptions={ {
      header: Header,
    }} >;

    {/*  

    eu comecei a fazer CRUD de cidades que o usuario poderia cadastrar pra acessar previsod o tempo
    mas o serviço 'https://appwrite.io/' so funciona qdo no computador, no emulador ou no celular nao funciona
    qq interacao com a base so pode ser feita via sql 
    <Stack.Screen name='cities'  options={{title: 'Cidades'}}  />

    */ }

    </Stack>
}



//**********************************************************************
//**********************************************************************
export default RootLayout;
