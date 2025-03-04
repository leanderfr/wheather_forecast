
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useEffect, useState } from 'react';





const Header = (props: NativeStackHeaderProps) => {

  const canGetBack = props.navigation.canGoBack();

  const [currentTemperature, setTemperature] = useState('12º');

const MINUTE_MS = 2000;

useEffect(() => {
  const interval = setInterval(() => {
    console.log('Logs every minute');
setTemperature( new Date().toLocaleString() );
  }, MINUTE_MS);

  return () => clearInterval(interval); 
}, []);



  return (

    <View style={styles.container}>

        {canGetBack ? 
        <MaterialIcons name="arrow-back" size={24} color="blue" /> 
        : '.' }


        <Text style={styles.title}> LONDON {StatusBar.currentHeight}</Text>
        <Text style={styles.currentTemperature}> {currentTemperature}</Text>

    </View>


  )

}

const styles = StyleSheet.create( {

  container: {
    height: 80,
    backgroundColor: '#32323C',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    marginLeft: 5,
    color: '#fff',
    fontFamily: 'Rubik_400Regular', 
  },

  currentTemperature: {
    fontSize: 30,
    marginRight: 5,
    color: '#fff',
    fontFamily: 'Rubik_400Regular', 
  }


}



)


export  default Header;