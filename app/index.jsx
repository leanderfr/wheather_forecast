
import { View, StyleSheet,  ActivityIndicator } from "react-native";
import ForecastList from "@components/ForecastList";
import { useState, useEffect } from 'react';
import '@/global.js';

const  HomeScreen = () =>  {

    let  [forecasts, setForecasts] = useState([]);
    let  [loading, setLoading] = useState(true);
    //  const [error, setError] = useState(null);

    useEffect(() => {
      fetchForecasts();

      const interval = setInterval(() => {
        fetchForecasts();
      }, global.milisecondsToRefresh);

      return () => clearInterval(interval); 
    }, []);


    //****************************************************************************************************************
    // ler previsoes do tempo, hoje + 4 dias
    //****************************************************************************************************************
    const fetchForecasts = async () => {
      setLoading(true);

        // apiKey gerada por mim (Leander) ao me cadastrar no serviço de previsao
        const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_KEY

        // le a previsao do tempo para hoje + 4 dias
        const url = `http://api.openweathermap.org/data/2.5/forecast?lat=-25.44&lon=-49.27&exclude=hourly,daily&appid=${apiKey}`
        let result = await fetch(url);

        if (!result.ok) {
            const message = `Erro ocorreu ao buscar previsões: ${result.status}`;
            throw new Error(message);
        }
        result = await result.json()  ;

        let differentWeatherDetected = [];
        let differentWeatherByDay = [];

        // a API acima comecou do nada a enviar previsao de 6 dias, ate ontem (terça feira 04/03/25) estava enviando so 5 dias 
        // o codigo abaixo detecta o 6o dia para mais adiante ignora lo
        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        let today = new Date();
        let dayToIgnore = today.addDays(5).toISOString().split('T')[0]

        // a API acima envia previsao de 3 em 3 horas para cada dia, o algoritmo abaixo tenta descobrir dentre as previsoes de cada dia, 
        // qual a previsao que ainda nao apareceu dentre todas as previsoes
        // faz isso porque se por exemplo, for obtida a previsao só de um horario (meio dia, por exemplo),  a chance de ser uma previsao repetida de um dia anterior é grande
        // tenta pegar previsoes diferentes para 'enriquecer' o prognostico do tempo
        for (let f=0; f < result.list.length ; f++)  {
          let weatherDescription = result.list[f].weather[0].description;   // scattered clouds, clear sky, etc etc
          let onlyDateTxt = result.list[f].dt_txt.split(' ')[0];   // yyyy-mm-dd

          if (dayToIgnore == onlyDateTxt) continue;    // ignora o 6o dia 
      
          // ainda nao foi detectada previsao para o dia atual e a previsao feita é nova, nao foi detectada ainda, define como melhor a previsao feita 
          if ( typeof differentWeatherByDay[onlyDateTxt] == 'undefined' && differentWeatherDetected.indexOf(weatherDescription)==-1 )  {
            differentWeatherByDay[onlyDateTxt] = weatherDescription;
            differentWeatherDetected.push( weatherDescription );
            continue;
          }
        }

        // se algum dos dias ficou sem melhor previsao definida, considera como melhor, a 1a previsao feita mesmo
        for (let f=0; f < result.list.length ; f++)  {
          let weatherDescription = result.list[f].weather[0].description;   // scattered clouds, clear sky, etc etc
          let onlyDateTxt = result.list[f].dt_txt.split(' ')[0];   // yyyy-mm-dd

          if (dayToIgnore == onlyDateTxt) continue;    // ignora o 6o dia 
      
          // ainda nao foi detectada previsao para o dia atual, define como melhor a 1a previsao obtida mesmo (por enquanto)
          if ( typeof differentWeatherByDay[onlyDateTxt] == 'undefined'  )  {
            differentWeatherByDay[onlyDateTxt] = weatherDescription;
            continue;
          }
        }


  //      for (var key in differentWeatherByDay) {
  //          console.log('e='+key+':'+differentWeatherByDay[key]);
  //      }

        let bestDetectedWeatherByDay = [];
        let dayAlreadyProcessed = [];

        // filtra somente a previsao do dia/horario que foi considerada acima como a 'melhor' (inedita) previsao para o dia
        for (let f=0; f < result.list.length ; f++)  {
          let weatherDescription = result.list[f].weather[0].description;   // scattered clouds, clear sky, etc etc
          let onlyDateTxt = result.list[f].dt_txt.split(' ')[0];   // yyyy-mm-dd

          if (dayToIgnore == onlyDateTxt) continue;

          // se a previsao atual (dentre as 8 previsoes diarias - 1 a cada 3 horas) tiver o prognostico mais diferente, inedito, detectado acima, considera ela como a que sera exibida
          if ( differentWeatherByDay[onlyDateTxt] == weatherDescription && typeof dayAlreadyProcessed[onlyDateTxt]=='undefined' ) {
            bestDetectedWeatherByDay.push( result.list[f] )        
            dayAlreadyProcessed[onlyDateTxt] = 'yes';
          }
        }

  //      for (var key in bestDetectedWeatherByDay) {
  //          console.log('e='+key+':'+bestDetectedWeatherByDay[key]);
  //      }


        // das 24 previsoes por dia, filtra somente a melhor do dia (melhor= diferente das demais de outros dias)
        setForecasts( bestDetectedWeatherByDay );
        setLoading(false);
    }


    return (
      <View style={styles.container} >

        {loading ? (      
          <View style={styles.containerLoading} >
              <ActivityIndicator size='large' color='#007bff' />
          </View>
        ) : 

        (
              <>
                <View style={styles.containerLoaded}   >
                    <ForecastList forecasts={forecasts} >
                    </ForecastList>
                </View>
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
  display: 'flex',
  flex: 1,
},


containerLoaded: {
  flex: 1,
  justifyContent: 'start',
  alignItems: 'center',
  padding: 10,
  backgroundColor: 'black',
  fontFamily: 'Roboto',
},

containerLoading: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  height: '100%',
  backgroundColor: 'black',
},


})

//**********************************************************************
//**********************************************************************
export default HomeScreen;

