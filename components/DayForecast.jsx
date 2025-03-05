
import { View, Text, Image } from 'react-native';

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

  return(

    <View>
      <Text >{forecast.dt_txt }{weatherCode}</Text>
      <Image source={{ uri: definedIcon }} style={{width: 100, height: 100}}   />
    </View>
  )


}

export default DayForecast;