
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

  const [countDown, setCountdown] = useState( global.milisecondsToCountDown/1000 -1);
  const [countDownWidth, setCountdownWidth] = useState('100%');

  const [loading, setLoading] = useState(true);

  //**********************************************************************
  // funcao que chama API com as previsoes do tempo para 
  // hoje + 5 dias 
  // o 5º dia sera ignorado porque a tarefa pede 5 dias somente (hoje+4)
  //**********************************************************************

  const readTodayForecast = async () => {

      // limpa os atualizadores
      clearInterval( global.fetchForecastsProcess )
      clearInterval( global.countDownProcess )

      // coloca a contagem regressiva no ZERO 
      global.countDown = 0
      setCountdown( global.countDown )
      setCountdownWidth('0%')


      // animacao de 'processando...'
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

      // converte a temperatura recebida em Kelvin para Celsius
      let temperatureKelvin = parseInt(forecast.main.temp, 10)  // converte usando só a parte inteira da temperatura em Kelvin
      let temperatureCelsius = temperatureKelvin - 273

      setCurrentTemperature( `${temperatureCelsius} º` );

      // memoriza qdo foi a ultima leitura
      let hours = new Date().getHours(); 
      let minutes = new Date().getMinutes(); 
      hours = zeroPad(hours, 2)
      minutes = zeroPad(minutes, 2)

      setLastForecastUpdate( `${hours}:${minutes}` );
      setLoading(false);

      // informa que a contagem esta reiniciando
      global.countDown = global.milisecondsToCountDown/1000;
      setCountdown( global.countDown )
      setCountdownWidth('100%')

      // aciona refresh de dados a cada  'milisecondsToRefresh' segundos
      global.fetchForecastsProcess = setInterval(() => {
         readTodayForecast();          
      }, global.milisecondsToRefresh);

      // atualiza a barra de contagem regressiva a cada 1 segundo
      global.countDownProcess = setInterval(() => {
        updateCountdown();
      }, 1000);
  }

  //**********************************************************************
  // relê previsoes a cada 'global.milisecondsToRefresh'
  //**********************************************************************

  useEffect(() => {
      // inicia contagem no maximo (total segundos e barra progresso com 100%)
      global.countDown = global.milisecondsToCountDown/1000;
      setCountdown( global.countDown-1 )
      setCountdownWidth('100%')

      // le pela 1a vez as previsoes
      readTodayForecast();

      // daqui 'milisecondsToRefresh' segundos, vai reler de novo 
      global.fetchForecastsProcess = setInterval(() => {
         readTodayForecast();  
      }, global.milisecondsToRefresh);

  }, []);

  //**********************************************************************
  // atualiza a barra de contagem regressiva para novo fetch 
  //**********************************************************************
  const updateCountdown = () => {

    // desliga contagem regressiva primeiro 
    clearInterval(global.countDownProcess)

    // necessario usar variavel global pq o calculo da barra de progresso em pixels usa a variavel de state 'countDown',  
    // que nao pode ser acessada por aqui, ela so é acessivel dentro de 'setCountdown()'

    // countDown é um espelho de global.countDown  e,
    // countDownWidth é um espelho de global.countDownWidth
    let secondsToUpdate = global.milisecondsToCountDown/1000
    global.countDown = global.countDown < 1  ? secondsToUpdate : global.countDown-1;
    setCountdown( global.countDown) ;

    let __countDownWidth = Math.floor(  (global.countDown * 100 / secondsToUpdate )  ) + '%'

    // atualiza percentual da contagem, consequentemente REACT atualiza a barra de progresso
    setCountdownWidth( __countDownWidth );

    // religa contagem regressiva e atualizacao da barra de contagem
    global.countDownProcess = setInterval(() => {
      updateCountdown();
    }, 1000);

  }
      

  //**********************************************************************
  //**********************************************************************

  return (
   
        <View>
       { loading ? 

        ( 
          <>
            <View style={styles.headerContainer}>
                <ActivityIndicator size='large' color='#007bff' />   
            </View>
          </>

        )  :
        (
          <>
            <View style={styles.headerContainer}>

                <View style={styles.threeColsHeader}  >
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

              <View style={styles.loadingText }>
                <Text style={{ fontSize: 18, color: '#fff', marginTop: -10 }}>Recarregando em {global.countDown} s</Text>
              </View>

              <View style={styles.countdownBar }>
                  <View id='countdownBar'
                      style={{width: countDownWidth, 
                      display:'flex',  backgroundColor:'#f9d69f', justifyContent: 'flex-start', height:20, borderRadius: 5, borderColor: 'transparent'  }}>
                      <Text>&nbsp;</Text>
                  </View>
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
    alignItems: 'center',
    fontFamily: 'Roboto',    
    justifyContent: 'center',
    width: '100%',
    height: 125,
  },


  threeColsHeader: {
    backgroundColor: '#32323C',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Roboto',    
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
  },

  countdownBar: {    
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '97%',    
    flex:1,
    height: 30,     /* 80 + 30 = 110 (altura total do header) */
    borderWidth: 2, 
    borderRadius: 5, 
    borderStyle: 'solid', 
    borderColor: 'gray',
    marginBottom: 5,
  },

  bar: {
    width: '95%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f9d69f',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    height: 25,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Roboto',
    color:'black',
    fontSize: 25,
  },



  /* 1a coluna do header */
  headerLeftInfo: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center' ,
    fontFamily: 'Roboto',
    flexBasis: '33%',
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
    flexBasis: '33%',
    flex: 1,
  },

  lastForecastUpdateText: {
    color: 'white',
    fontFamily: 'Roboto',
    paddingHorizontal: 10,
  },

  /* 3a coluna do header */
  currentTemperature: {
    flexBasis: '33%',
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

  loadingText: {
    display: 'flex',
    paddingLeft: '2%',
    width:'100%',
    paddingTop: -10,

  }
}

)


//**********************************************************************
//**********************************************************************

export  default Header;