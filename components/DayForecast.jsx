
import { View, Text, Image, StyleSheet } from 'react-native';


const DayForecast = ( {forecast}) => {

  /*
  icons por codigo do clima:
  Group 2xx: Thunderstorm, tempestade
  Group 3xx: Drizzle, chuvisco
  Group 5xx: Rain, chuva
  Group 6xx: Snow, neve
  Group 7xx: Atmosphere
  Group 800: Clear sky
  Group 80x: Clouds

  */
  weatherIcons =  [ 
    [200, 232, '11d'],   
    [300, 321, '09d'],   
    [500, 504, '10d'],   
    [511, 511, '13d'],   
    [520, 531, '09d'],   
    [600, 622, '13d'],   
    [701, 781, '50d'],   
    [800, 800, '01d'],   
    [801, 801, '02d'],   
    [802, 802, '03d'],   
    [803, 804, '04d'],   

  ]
  const weatherCode = parseInt( forecast.weather[0].id, 10) ;

  let definedIcon = '';
  for (let w=0; w < weatherIcons.length; w++) {
    if (weatherCode >= weatherIcons[w][0] && weatherCode <= weatherIcons[w][1])  {
      definedIcon = weatherIcons[w][2];
      break;
    }
  }  


  // o algoritmo acima nao era necesssario porque a API retorna o icone, eu nao sabia disso, vou manter o algotirmo por uma questao de historico excepcionalmente
  definedIcon = forecast.weather[0].icon
  definedIcon = `https://openweathermap.org/img/wn/${definedIcon}@2x.png`;

  // exemplo "dt_txt": "2025-03-05 03:00:00"
  let dateParts = forecast.dt_txt.split(' ')[0].split('-');   // obtem so a data
  let time = forecast.dt_txt.split(' ')[1];   // obtem so a hora

  let temperatureKelvin = parseInt(forecast.main.temp, 10)  // converte usando só a parte inteira da temperatura em Kelvin
  let temperatureCelsius = temperatureKelvin - 273


  let actualDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); 
  let forecastMoment =  dateParts[2] + '/' + dateParts[1] + ' - '  +time.substring(0, time.length-3) + ' h';

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let weekday = weekdays[actualDate.getDay()];

  let weatherDetail = forecast.weather[0].description.toUpperCase()

  return(

    <View style={styles.dayForecast} >
      <View style= {styles.dayInfo }>
          <Text style={styles.weekday}> {weekday} </Text>
      </View>

      <View style= {styles.forecastMoment }>
          <Text style={{color:'#fff'}} > {forecastMoment} </Text>
          <Text style={{color:'#fff'}}> {temperatureCelsius} º </Text>
      </View>


      <View style={styles.weatherDetail} >  
          <Image source={{ uri: definedIcon }} style={ styles.weatherIcon }   />
          <Text style={styles.weatherDetailText}> { weatherDetail } </Text>
      </View>
    </View>
  )
}

export default DayForecast;

//**********************************************************************
//**********************************************************************
const styles = StyleSheet.create( {

dayForecast: {
  flex: 1,
  justifyContent: 'space-between',
  flexDirection: 'row',
  padding: 10,
  backgroundColor: '#5F5F64',
  fontFamily: 'Roboto',
  color: '#fff',
  borderRadius: 10,
},

dayInfo: {
  display: 'flex',
  flexDirection: 'row',
  flexBasis: '20%',  
  color:'#fff',
},

weekday: {
  fontSize: 23,
  color: '#fff',
},

forecastMoment: {
  fontSize: 15,
  color: '#fff',
  paddingTop: 6,
  display: 'flex',
  flexBasis: '30%',
  flexDirection: 'column',
},

weatherDetail: {
  paddingTop: -10,
  display: 'flex',
  flexDirection: 'column',  
  color: '#fff',
  fontSize: 25,
  justifyContent: 'center',
  alignItems: 'flex-end',
  flexBasis: '50%',
  paddingRight: 20,
},
weatherDetailText: {
  color: '#fff',
  fontSize: 15,
},

weatherIcon: {
  width: 60,
  height: 60,
  /* o icone obtido possui uma margem interna superior que faz parecer que esta desalinhado, necessario 'subir' o icon 20 pixels para alinhar */
  marginTop: -20,

}



})
