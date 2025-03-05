
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useEffect, useState } from 'react';
import '@/global.js';



const Header = (props) => {

  const canGetBack = props.navigation.canGoBack();

  var hours = new Date().getHours(); 
  var minutes = new Date().getMinutes(); 

  const [currentCity, setCurrentCity] = useState( global._currentCity );
  const [lastTemperature, setCurrentTemperature] = useState('');
  const [lastForecastUpdate, setLastForecastUpdate] = useState( `${hours}:${minutes}` );

  const [loading, setLoading] = useState(true);

  const MINUTE_MS = 5000;


  const loadTodayForecast = async () => {

      setLoading(true);
      setCurrentCity( global._currentCity );

      var hours = new Date().getHours(); 
      var minutes = new Date().getMinutes(); 
      var sec = new Date().getSeconds(); 

      setCurrentTemperature( sec );

      setLastForecastUpdate( `${hours}:${minutes}` );



      setLoading(false);
  }

  useEffect(() => {
    loadTodayForecast();

    const interval = setInterval(() => {
      loadTodayForecast();
    }, MINUTE_MS);

    return () => clearInterval(interval); 
  }, []);


  return (

    
    <View style={styles.container}  >
    
       { loading ? 

        ( 
          <>
            <Text >.</Text>
            <ActivityIndicator size='large' color='#007bff' />   
            <Text >.</Text>
          </>

        )  :
        (
          <>
              {/* seta para voltar e cidade */}
              <View style = {styles.headerLeftInfo} >
                {!canGetBack ? 
                  <Image source={require('@images/back-arrow2.png')}  />
                : ('.') }

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
              <View style={styles.currentTemperature}>
                  <Text style={styles.currentTemperatureText}> {lastTemperature} º</Text>
              </View>

          </>
        )

      }
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
    fontFamily: 'Roboto',    
  },

  /* 1a coluna do header */
  headerLeftInfo: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center' ,
    fontFamily: 'Roboto',
    flexBasis: '40%',
    paddingLeft: 15,
    flex: 1,
  },

  city: {
    fontSize: 18,
    marginLeft: 5,
    color: '#fff',
    fontFamily: 'Roboto',
  },

  /* 2a coluna do header */
  lastForecastUpdate: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    fontFamily: 'Roboto',
    alignItems: 'center',
    flexBasis: '30%',
    flex: 1,
  },

  lastForecastUpdateText: {
    color: 'white',
    fontFamily: 'Roboto',
    paddingHorizontal: 10,
  },

  /* 3a coluna do header */
  currentTemperature: {
    flexBasis: '30%',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    flex: 1,
   },

  currentTemperatureText: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'Roboto',
 },



}

)


export  default Header;