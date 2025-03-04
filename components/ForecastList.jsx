
import { View, FlatList } from 'react-native';
import DayForecast from './DayForecast';

const ForecastList = ( {forecasts}) => {

  return(<View >
            <FlatList 
              data = {forecasts}
              keyExtractor = { (item) => item.$id }
              renderItem= { ({item}) => <DayForecast forecast={item}  /> } >
            </FlatList>

        </View>  )

}

export default ForecastList;