
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useEffect, useState } from 'react';
import '@/global.js';


const Header = (props) => {

  const canGetBack = props.navigation.canGoBack();
  const zeroPad = (num, places) => String(num).padStart(places, '0')


  let hours = new Date().getHours(); 
  let minutes = new Date().getMinutes(); 

  hours = zeroPad(hours, 2)
  minutes = zeroPad(minutes, 2)

  const [currentCity, setCurrentCity] = useState( global._currentCity );
  const [lastTemperature, setCurrentTemperature] = useState('');
  const [lastForecastUpdate, setLastForecastUpdate] = useState( `${hours}:${minutes}` );

  const [loading, setLoading] = useState(true);

  //**********************************************************************
  // funcao que chama API com as previsoes do tempo para 
  // hoje + 5 dias 
  // o 5º dia sera ignorado porque a tarefa pede 5 dias somente (hoje+4)
  //**********************************************************************

  const readTodayForecast = async () => {

      setLoading(true);
      setCurrentCity( global._currentCity );

      // apiKey gerada por mim (Leander) ao me cadastrar no serviço de previsao
      const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_KEY

      // le a previsao do tempo para hoje 
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=-25.44&lon=-49.27&exclude=hourly,daily&appid=${apiKey}`
      let result = await fetch(url);

      if (!result.ok) {
          const message = `Erro ocorreu ao buscar previsão: ${result.status}`;
          throw new Error(message);
      }
      let forecast = await result.json()  ;

      let temperatureKelvin = parseInt(forecast.main.temp, 10)  // converte usando só a parte inteira da temperatura em Kelvin
      let temperatureCelsius = temperatureKelvin - 273

      setCurrentTemperature( `${temperatureCelsius} º` );

      let hours = new Date().getHours(); 
      let minutes = new Date().getMinutes(); 
      hours = zeroPad(hours, 2)
      minutes = zeroPad(minutes, 2)

      setLastForecastUpdate( `${hours}:${minutes}` );

      setLoading(false);
  }

  //**********************************************************************
  // relê previsoes a cada 'global.milisecondsToRefresh'
  //**********************************************************************

  useEffect(() => {
    readTodayForecast();

    const interval = setInterval(() => {
      readTodayForecast();
    }, global.milisecondsToRefresh);

    return () => clearInterval(interval); 
  }, []);


  //**********************************************************************
  //**********************************************************************

  return (

    
    <View style={styles.headerContainer} >
    
       { loading ? 

        ( 
          <>
            <View style={styles.headerLoading}>
                <ActivityIndicator size='large' color='#007bff' />   
            </View>
          </>

        )  :
        (
          <>
              <View style={styles.customHeader}  >

                  {/* seta para voltar e cidade */}
                  {/* seta nunca sera exibida porque infelizmente nao deu tempo de fazer o CRUD para criar/editar novas cidades , esse crud teria vai/volta de janelas */}
                  <View style = {styles.headerLeftInfo} >

{/*
                    {canGetBack ?                     
                      <Image source={require('@images/back-arrow2.png')}  /> : '.' 
                    }
*/}

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
                      <Text style={styles.currentTemperatureText}> {lastTemperature} </Text>
                  </View>
              </View>

              <View style={styles.countdownBar }>
                <View style={styles.bar}>
                  <Text>Recarregando em... </Text>
                </View>
              </View>

          </>
        )

      }
    </View>

  )

}

//**********************************************************************
//**********************************************************************
const styles = StyleSheet.create( {

  headerContainer: {
    backgroundColor: '#32323C',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 110,
    flex: 1,
  },

  customHeader: {
    backgroundColor: '#32323C',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Roboto',    
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
  },

  headerLoading: {
    backgroundColor: '#32323C',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Roboto',    
    justifyContent: 'center',
    width: '100%',
    height: 110,
  },

  countdownBar: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    
  },

  bar: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f9d69f',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    height: 30,
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Roboto',
    color:'black',
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


//**********************************************************************
//**********************************************************************

export  default Header;