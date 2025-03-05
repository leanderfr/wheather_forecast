
import { View, StyleSheet,  Text, ActivityIndicator } from "react-native";
import ForecastList from "@components/ForecastList";
import { useState, useEffect } from 'react';



const  HomeScreen = () =>  {

let  [forecasts, setForecasts] = useState([]);
let  [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForecasts();
  }, []);

  //****************************************************************************************************************
  // ler todas as anotacoes
  //****************************************************************************************************************
  const fetchForecasts = async () => {
    setLoading(true);

      //const url = 'https://jsonplaceholder.typicode.com/users';
      const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_KEY

      const url = `http://api.openweathermap.org/data/2.5/forecast?lat=-25.44&lon=-49.27&exclude=hourly,daily&appid=${apiKey}`
      let result = await fetch(url);

console.log('carregou......................');
      
      if (!result.ok) {
          const message = `An error has occured: ${result.status}`;
          throw new Error(message);
      }
      result = await result.json()   ;

	    let onlyMiddayForecasts = [];
      for (let f=0; f < result.list.length ; f++)  {

        // a URL acima retorna 40 previsoes, um a cada 3 horas de cada dia, ou seja 5 X 8 = 40
        // filtrando as previsoes somente do 1/2 dia
        let dateTxt = result.list[f].dt_txt;
        if ( dateTxt.indexOf('12:00:00')!=-1 )
          onlyMiddayForecasts.push( result.list[f] );

      }
      setForecasts( onlyMiddayForecasts );
      setLoading(false);

  }


  return (
    <View style={styles.container}   >
      {loading ? (      
        <ActivityIndicator size='large' color='#007bff' />
      ) : 

       (
            <>
              <ForecastList forecasts={forecasts} >
              </ForecastList>
            </>

      ) 

      }
    </View>

  );
}

//**********************************************************************
//**********************************************************************
const styles = StyleSheet.create( {

container: {
  flex: 1,
  justifyContent: 'start',
  alignItems: 'center',
  padding: 10,
  backgroundColor: 'black',
  fontFamily: 'Roboto',
},


})

//**********************************************************************
//**********************************************************************
export default HomeScreen;