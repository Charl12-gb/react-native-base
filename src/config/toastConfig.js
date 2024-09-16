import { View , Text, Dimensions,StyleSheet} from 'react-native';
import { theme } from '../assets/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ICON = {
  error: "close-circle",
  success: "check-circle",
  available: "wifi-check",
  unavailable: "wifi-off"
}

const renderLeadingIcon = (name) => {
  return (
    <MaterialCommunityIcons name={name} color={theme.default.white} size={20} style={{textAlign:"center",}}/>
  )
}

export const toastConfig = {
   
   
    success: (props) => (
      <View style={[styles.toastContainer, {backgroundColor: theme.default.primary}]}>
          {renderLeadingIcon(ICON["success"])}
          <Text style={[styles.message]}>{props.text2}</Text>
      </View>
    ),
    
    error: (props) => (
      <View style={[styles.toastContainer, {backgroundColor: theme.default.error}]}>
          {renderLeadingIcon(ICON["error"])}
          <Text style={[styles.message]}>{props.text2}</Text>
      </View>
    ),
     
    available: (props) => (
      <View style={[styles.toastContainer, {backgroundColor: theme.default.available}]}>
          {renderLeadingIcon(ICON["available"])}
          <Text style={[styles.message]}>{props.text2}</Text>
      </View>
    ),
    unavailable: (props) => (
      <View style={[styles.toastContainer, {backgroundColor: theme.default.unavailable}]}>
          {renderLeadingIcon(ICON["unavailable"])}
          <Text style={[styles.message]}>{props.text2}</Text>
      </View>
    ),
}

const styles = StyleSheet.create({
    toastContainer: {
      margin:0,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      alignItems: "center" ,
      flexDirection: "row",
      padding:10,
      marginTop: 25,
    },
    message: {
      color: "#fff",
      fontWeight: "bold",
      marginLeft: 18
    },
    iconContainer: {
      marginRight: 5,
    },
});