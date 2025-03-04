
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useEffect, useState } from 'react';
import '@/global.js';



const Header = (props) => {

  const canGetBack = props.navigation.canGoBack();

  const [currentCity, setCurrentCity] = useState( global._currentCity );
  const [lastTemperature, setCurrentTemperature] = useState('');
  const [lastForecastUpdate, setLastForecastUpdate] = useState('');


  const MINUTE_MS = 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('acionou');
      setCurrentCity( global._currentCity );

      var hours = new Date().getHours(); 
      var minutes = new Date().getMinutes(); 
      var sec = new Date().getSeconds(); 

      setCurrentTemperature( sec );

      setLastForecastUpdate( `${hours}:${minutes}` );
    }, MINUTE_MS);

    return () => clearInterval(interval); 
  }, []);



  return (

    <View style={styles.container}>

        {/* seta para voltar e cidade */}
        <View style = {{ display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
          {!canGetBack ? 
          <Text style={ {fontSize: 45, color: 'white'}} >⇽</Text>
          : '.' }

          <Text style={styles.title}> {currentCity} </Text>
        </View>

        {/* hora da ultima atualizacao */}
        <View style={styles.lastForecastUpdate}>
            <Text style={styles.lastForecastUpdateText}> {lastForecastUpdate}</Text>
        </View>

        {/* ultima temperatura obtida */}
        <View>
            <Text style={styles.currentTemperature}> {lastTemperature}</Text>
        </View>

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
    paddingRight: 15,
    color: '#fff',
    fontFamily: 'Rubik_400Regular', 
 },

  lastForecastUpdate: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    padding: 10,
  },

  lastForecastUpdateText: {
    color: 'white',
  },




}



)


export  default Header;