
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
  definedIcon = `https://openweathermap.org/img/wn/${definedIcon}@2x.png`;

  // exemplo "dt_txt": "2025-03-05 03:00:00"
  var parts = forecast.dt_txt.split(' ')[0].split('-');   // obtem so a data
  var actualDate = new Date(parts[0], parts[1] - 1, parts[2]); 
  var dayAndMonth =  parts[2] + '/' +parts[1];    // dd/mm

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let weekday = weekdays[actualDate.getDay()];

  let weatherDetail = forecast.weather[0].description.toUpperCase()

  return(

    <View style={styles.dayForecast} >
      <View style= {styles.dayInfo }>
          <Text style={styles.weekday}> {weekday} </Text>
          <Text style={styles.dayAndMonth}> {dayAndMonth} </Text>
      </View>

      <View style={styles.weatherDetail} >  
          <Image source={{ uri: definedIcon }} style={{width: 60, height: 60}}   />
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
},

dayInfo: {
  display: 'flex',
  flexDirection: 'row',
  gap: 30,
},

weekday: {
  fontSize: 23,
  color: '#fff',
  width: 60,
},

dayAndMonth: {
  fontSize: 15,
  color: '#fff',
  paddingTop: 8,
},

weatherDetail: {
  paddingTop: -10,
  display: 'flex',
  flexDirection: 'column',  
  color: '#fff',
  fontSize: 25,
  justifyContent: 'center',
  alignItems: 'flex-end',
},
weatherDetailText: {
  color: '#fff',
  fontSize: 15,
}


})
