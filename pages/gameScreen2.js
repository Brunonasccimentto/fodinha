import { useState } from "react"
import PlayerList from "../components/playerList"
import { View, Text, TouchableOpacity, FlatList, Vibration } from "react-native"
import { styles } from "../styles/styles"
import Toast from "react-native-toast-message"

export default function GameScreen2({ route, navigation }) {

    const [selectedPlayers, setSelectedPlayers] = useState([])

    const players = route.params.players
    const round = route.params.round
    const dealer = route.params.dealer
    const howManyCards = route.params.howManyCards

    const endRound = () => {

        if (selectedPlayers.length !== 0) {
            roundLosePlayers()
            setSelectedPlayers([])
            howManyCards()
            dealer()
            navigation.navigate("GameScreen1", { players: players })
        } else {
            Vibration.vibrate()
            Toast.show({
                type: "error",
                text1: "Você precisa selecionar o perdedor da rodada !"
            })
        }
    }

    const roundLosePlayers = () => {
        selectedPlayers.map((item) => {
            item.points += +1
        })
    }

    const HandleOnLongPress = (item) => {
        if (item.points === 5) {
            return
        }
        setSelectedPlayers([...selectedPlayers, item])

        let index = selectedPlayers.findIndex(element => element.id === item.id)
        if (index !== -1) {
            removeSelectedPlayer(index)
        }
    }

    const removeSelectedPlayer = (index) => {
        selectedPlayers.splice(index, 1)
        setSelectedPlayers([...selectedPlayers])
    }

    const getSelected = (item) => {
        return selectedPlayers.includes(item)
    }

    return (
        <View style={[styles.containerPlayersScreen]}>
                <View style={[{ backgroundColor: "#4330a5", paddingTop: 50, borderBottomRightRadius: 50 }]}>
                    <Text style={[{ fontSize: 18, padding: 20, color: "#f1f1f1" }]}>Selecione o perdedor da rodada {round} </Text>
                </View>

                <View style={styles.listContext}>
                    <FlatList data={players} showsVerticalScrollIndicator={false} renderItem={({ item }) => (
                        <PlayerList
                            item={item}
                            players={players}
                            selectedPlayers={selectedPlayers}
                            setSelectedPlayers={setSelectedPlayers}
                            DeleteIconVisible={false}
                            countVisible={true}
                            selected={getSelected(item)}
                            LongPress={HandleOnLongPress} />
                    )
                    } keyExtractor={(item, index) => { index }} />
                </View>

            <TouchableOpacity style={[styles.finishButton]} onPress={endRound}>
                <Text style={[{ color: "#fff", fontWeight: "bold", color: "#4330a5" }]}> Finalizar rodada </Text>
            </TouchableOpacity>
            <Toast />
        </View>
    )
}