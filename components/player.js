import { Text, View, TouchableOpacity } from "react-native"
import { Camera } from 'expo-camera';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export function Player(props){

    const navigation = useNavigation();
    const [permission, requestPermission] = Camera.useCameraPermissions();

    function permissionAndNav(){
        requestPermission()
        props.canSetPhoto === true && permission.granted === true ? navigation.navigate("CameraScreen", {permission: permission, item: props.item}): null
    }

    return(
        <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <TouchableOpacity  onPress={permissionAndNav} activeOpacity={1}>
                {props.item.photo !== null ?
                <Avatar.Image size={50} source={{uri: props.item.photo}}/>
                : <Avatar.Text style={[{backgroundColor: `${props.color}`}]} color="#fff" size={50} label={props.initialLetters} />
                }
                
            </TouchableOpacity>
            <Text style={[{fontSize: 18, marginLeft: 10, color: "#333"}]}> {props.playerName} </Text>
        </View>
    )
}