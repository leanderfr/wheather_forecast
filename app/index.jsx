import { Text, View, StyleSheet,  TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';  


const  HomeScreen = () =>  {
  const router = useRouter();

  return (

        <View style={styles.container}   >
          <Text style={styles.title}>Welcome to Notes __App.</Text>
          <Text style={styles.subtitle}>Capture your __thoughts, anywhere, anytime</Text>


          <TouchableOpacity 
            style={styles.button}  
            onPress = { () => {}}  >      
            <Text style={styles.buttonText} >__Iniciar__</Text>
          </TouchableOpacity>
        </View>

  );
}

//**********************************************************************
//**********************************************************************
const styles = StyleSheet.create( {

container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  backgroundColor: '#5A5A5F',
  fontFamily: 'Roboto',
},


})

//**********************************************************************
//**********************************************************************
export default HomeScreen;