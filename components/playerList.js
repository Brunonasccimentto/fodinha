import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "../styles/styles";
import { Player } from "./player";
import { Button } from "react-native-paper";

export default function PlayerList({ deletePlayer, ShowCounter, DeleteIconVisible, countVisible, selected, LongPress, item, players, canSetPhoto}) {

    const [count, setCount] = useState(0);
    const arr = players

    const iconPoints = (points) => {
        switch (points) {
            case 0: return <MaterialCommunityIcons name="numeric-0-box-multiple-outline" color="#333" size={30} style={[{ display: countVisible == true ? "flex" : "none" }]} />
            case 1: return <MaterialCommunityIcons name="numeric-1-box-multiple-outline" color="#333" size={30} style={[{ display: countVisible == true ? "flex" : "none" }]} />
            case 2: return <MaterialCommunityIcons name="numeric-2-box-multiple-outline" color="#333" size={30} style={[{ display: countVisible == true ? "flex" : "none" }]} />
            case 3: return <MaterialCommunityIcons name="numeric-3-box-multiple-outline" color="#333" size={30} style={[{ display: countVisible == true ? "flex" : "none" }]} />
            case 4: return <MaterialCommunityIcons name="numeric-4-box-multiple-outline" color="#333" size={30} style={[{ display: countVisible == true ? "flex" : "none" }]} />
            case 5: return <MaterialCommunityIcons name="numeric-5-box-multiple-outline" color="#333" size={30} style={[{ display: countVisible == true ? "flex" : "none" }]} />
        }
    }

    return (

        <TouchableOpacity style={[styles.shadowProp, styles.card]} onLongPress={() => { LongPress !== undefined ? LongPress(item) : "" }} delayLongPress={150} activeOpacity={0.9}>
            <View style={[{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", height: "100%", padding: 12 }]}  >

                <View style={styles.cardContent}>
                    <Player playerName={item.playerName} color={item.playerColor} item={item} canSetPhoto={canSetPhoto} initialLetters={item.playerName.substring(0, 2).toUpperCase()} />
                    {item.dealer && <MaterialCommunityIcons name="poker-chip" color="#4330a5" size={30}/>}
                </View>

                <View style={[{ display: ShowCounter == null ? "none" : "flex", flexDirection: "row", alignItems: "center" }]}>
                    <Button onPress={() => { setCount(arr.find((element) => element.id === item.id).count = item.count - 1) }}>
                        <Text> - </Text>
                    </Button>
                    <Text> {item.count} </Text>
                    <Button onPress={() => { setCount(arr.find((element) => element.id === item.id).count = item.count + 1) }}>
                        <Text> + </Text>
                    </Button>
                </View>
                <MaterialCommunityIcons name="delete-outline" size={30} color="#555" style={[{ position: "absolute", right: 0, display: DeleteIconVisible == null ? "flex" : "none" }]} onPress={() => { deletePlayer(arr.findIndex(obj => { return obj.id === item.id; })) }} />

                {iconPoints(item.points)}

            </View>
            {selected && <View style={[{ position: "absolute", backgroundColor: "rgba(rgba(67, 48, 165, 0.3))", height: "100%", width: "100%", top: 0, borderRadius: 8 }]} />}
            {item.points === 5 &&
                <View style={[{ position: "absolute", backgroundColor: "rgba(196, 33, 40, 0.8)", height: "100%", width: "100%", top: 0, borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center" }]}>
                    <Text style={[{ fontSize: 20, color: "#f1f1f1", fontWeight: "bold" }]}>Eliminado</Text>
                </View>}

        </TouchableOpacity>
    )  
}