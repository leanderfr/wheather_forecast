
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

      const url = 'https://jsonplaceholder.typicode.com/users';
      let result = await fetch(url);

console.log('carregou......................');
      
      if (!result.ok) {
          const message = `An error has occured: ${result.status}`;
          throw new Error(message);
      }
      result = await result.json()   ;

      setForecasts(result);
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
  backgroundColor: '#5A5A5F',
  fontFamily: 'Roboto',
},


})

//**********************************************************************
//**********************************************************************
export default HomeScreen;