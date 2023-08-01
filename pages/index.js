import { View, Text, TouchableOpacity, Image } from "react-native"
import {styles} from "../styles/styles"
import cards from "../images/cards.png"

export default function HomeScreen({navigation}){

    return(
        <View style={styles.containerHomeScreen}>
                <Image source={cards} style={[{width: 200, height: 200}]}/>
                <TouchableOpacity style={styles.startButton} onPress={()=>{navigation.navigate("Jogadores")}}>
                    <Text style={[{color: "#fff", fontWeight: "bold"}]}> Começar </Text>
                </TouchableOpacity>
        </View>
    )
}