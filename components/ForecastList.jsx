
import { View, FlatList, StyleSheet } from 'react-native';
import DayForecast from './DayForecast';

const ForecastList = ( {forecasts}) => {

  return(<View style={styles.forecastList} >
            <FlatList 
              data = {forecasts}
              keyExtractor={(item, index) => {
                return item.dt;
              }}

              renderItem= { ({item}) => <DayForecast forecast={item}  /> } 
              ItemSeparatorComponent={() => <View style={{height: 20}} />} >
            </FlatList>

        </View>  )

}

export default ForecastList;

//**********************************************************************
//**********************************************************************
const styles = StyleSheet.create( {

  forecastList: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '98%',
    marginVertical: 20,
  },

})
