
import { View, FlatList } from 'react-native';
import DayForecast from './DayForecast';

const ForecastList = ( {forecasts}) => {

  return(<View >
            <FlatList 
              data = {forecasts}
              keyExtractor={(item, index) => {
                return item.dt;
              }}

              renderItem= { ({item}) => <DayForecast forecast={item}  /> } >
            </FlatList>

        </View>  )

}

export default ForecastList;

//renderItem= { ({item}) => <DayForecast forecast={item}  /> } >