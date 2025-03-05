
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
  var actualDateTxt =  parts[2] + '/' +parts[1];    // dd/mm

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let weekDayTxt = weekdays[actualDate.getDay()];


  return(

    <View style={styles.dayForecast} >
      <Text style={styles.dayWeekTxt}> {weekDayTxt} </Text>
      <Text style={styles.dayWeek}> {actualDateTxt} </Text>
      <Image source={{ uri: definedIcon }} style={{width: 100, height: 100}}   />
    </View>
  )
}

export default DayForecast;

//**********************************************************************
//**********************************************************************
const styles = StyleSheet.create( {

dayForecast: {
  flex: 1,
  justifyContent: 'start',
  flexDirection: 'row',
  padding: 10,
  backgroundColor: '#5F5F64',
  alignItems: 'center',
  fontFamily: 'Roboto',
  color: '#fff',
},

dayWeekTxt: {
  fontSize: 23,
  color: '#fff',
},

dayWeek: {
  fontSize: 15,
  color: '#fff',
  paddingTop: 5,
}


})
