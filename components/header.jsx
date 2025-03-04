
import { Text, View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from 'react';
import '@/global.js';



const Header = (props) => {

  const canGetBack = props.navigation.canGoBack();

  var hours = new Date().getHours(); 
  var minutes = new Date().getMinutes(); 

  const [currentCity, setCurrentCity] = useState( global._currentCity );
  const [lastTemperature, setCurrentTemperature] = useState('');
  const [lastForecastUpdate, setLastForecastUpdate] = useState( `${hours}:${minutes}` );


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
        <View style = {styles.headerLeftInfo} >
          {!canGetBack ? 
            <Image source={require('@images/back-arrow2.png')}  />
          : '.' }

          <Text style={styles.city}> {currentCity} </Text>
        </View>

        {/* hora da ultima atualizacao */}
        <View style={styles.lastForecastUpdate}>
            <Image source={require('@images/_bola3.png')} />
            <Image source={require('@images/_bola2.png')}  />
            <Image source={require('@images/_bola1.png')}  />

            <Text style={styles.lastForecastUpdateText}> {lastForecastUpdate}</Text>

            <Image source={require('@images/_bola3.png')}  />
            <Image source={require('@images/_bola2.png')}  />
            <Image source={require('@images/_bola1.png')}  />

        </View>

        {/* ultima temperatura obtida */}
        <View>
            <Text style={styles.currentTemperature}> {lastTemperature} º</Text>
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
    fontFamily: 'Roboto',
  },

  city: {
    fontSize: 18,
    marginLeft: 5,
    color: '#fff',
    fontFamily: 'Roboto',
  },

  currentTemperature: {
    fontSize: 30,
    paddingRight: 15,
    color: '#fff',
    fontFamily: 'Roboto',
 },

  lastForecastUpdate: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    width: 200,
    justifyContent: 'center',
    padding: 10,
    fontFamily: 'Roboto',
    alignItems: 'center',
  },

  lastForecastUpdateText: {
    color: 'white',
    fontFamily: 'Roboto',
    paddingHorizontal: 10,
  },

  headerLeftInfo: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center' ,
    fontFamily: 'Roboto',
  }




}



)


export  default Header;