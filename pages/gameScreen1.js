import { useState, useEffect } from "react"
import { View, Text, Vibration, FlatList, TouchableOpacity } from "react-native"
import Toast from 'react-native-toast-message'
import LottieView from 'lottie-react-native';
import Modal from "react-native-modal";
import { Button } from "react-native-paper"
import { styles } from "../styles/styles"
import PlayerList from "../components/playerList"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function GameScreen1({ route, navigation }) {

    const players = route.params.players
    const [round, setRound] = useState(1)
    const [cards, setCards] = useState(1)
    const [increment, setIncrement] = useState(true)
    const [winner, setWinner] = useState()

    useEffect(() => {
        gameWin()
    })

    function startRound() {
        const Sum = players.reduce((counter, obj) => {
            counter += obj.count
            return counter
        }, 0)

        if (cards !== Sum) {
            historyCardsPlayer()
            navigation.navigate("GameScreen2", { players: players, round: round, dealer: dealer, howManyCards: howManyCards })
        }
        if (cards === Sum) {
            Vibration.vibrate(500)
            Toast.show({ type: "error", text1: `O ultimo jogador precisa fazer ${Sum - cards - 1} ou ${Sum - cards + 1}` })
        }
    }

    const cardsCount = {
        value: cards,
        increment: increment,
        maxValue: 5,
        minValue: 1
    };

    function howManyCards() {
        setRound(round + 1)
        cardsCount.increment === true ? cardsCount.value++ : cardsCount.value--;
        if (cardsCount.value == cardsCount.maxValue) {
            setIncrement(false);
        }
        if (cardsCount.value == cardsCount.minValue) {
            setIncrement(true);
        }
        setCards(cardsCount.value)
    }

    function historyCardsPlayer() {
        players.map((item) => {
            item.historyCount.push(item.count)
        })
    }

    function dealer() {                                   //Isso foi mto dificil de fazer
        let dealer = players.filter(item => item.points < 5)
        let dealerFiltedArray = dealer.map((item) => { return item.dealer })
        let lastDealer = dealerFiltedArray.findIndex((element) => { return element === true })

        players.map((item) => { return item.dealer = false })

        if (dealer[lastDealer + 1] !== undefined) {
            let newDealer = players.findIndex(obj => { return dealer[lastDealer + 1].id === obj.id })
            players[newDealer].dealer = true

        }
        if (dealer[lastDealer + 1] === undefined) {
            dealer[0].dealer = true
            let newDealer = players.findIndex(obj => { return obj.id === dealer[0].id })
            players[newDealer].dealer = true

        }
    }

    function gameWin() {
        const playerPoints = players.map(item => item.points)
        let howManyHaveFive = 0

        for (let i = 0; i < playerPoints.length; i++) {
            if (playerPoints[i] === 5) howManyHaveFive++;
        }

        if (players.length - 1 === howManyHaveFive) {
            const winner = playerPoints.findIndex(element => element !== 5)
            setWinner(`Parabéns ${players[winner].playerName} você ganhou o jogo`)
        }
    }

    return (
        <View style={styles.containerPlayersScreen}>
            <View style={[{ backgroundColor: "#4330a5", paddingTop: 50, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }]}>
                <View style={[{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 }]}>
                    <Text style={[{ fontSize: 20, color: "#f1f1f1", }]}> Rodada {round} </Text>
                    <View style={[{ display: "flex", flexDirection: "row" }]}>
                        <Text style={[{ fontSize: 20, color: "#f1f1f1", }]}> cartas {cards}  </Text>
                        <MaterialCommunityIcons name="cards-playing" color="#c42128" size={30} />
                    </View>

                </View>
            </View>

            <View style={styles.listContext}>
                <FlatList data={players} showsVerticalScrollIndicator={false} renderItem={({ item }) => (
                    <PlayerList
                        players={players}
                        item={item}
                        DeleteIconVisible={false}
                        ShowCounter={true}
                        countVisible={true}
                    />
                )

                } keyExtractor={(item, index) => { index }} />
            </View>

            <TouchableOpacity style={styles.addPlayerButton} onPress={startRound}>
                <MaterialIcons name="navigate-next" color="#fff" size={30} />
            </TouchableOpacity>
            <Toast />
            {winner ?
                <>
                    <LottieView
                        autoPlay={true}
                        source={require("../assets/fireworks.json")}
                        loop={true}
                        style={{ height: 500, position: "absolute", top: 0, zIndex: 10 }}
                        resizeMode="cover" />
                    <Modal isVisible={true} backdropOpacity={0.2} backdropColor="#4330a5">
                        <View style={[styles.playerModal, { backgroundColor: "#4330a5", justifyContent: "space-between" }]}>
                            <Text style={{ fontSize: 26, fontWeight: "bold", color: "#f1f1f1", textAlign: "center" }}>{winner}</Text>
                            <LottieView
                                autoPlay={true}
                                source={require("../assets/trophy.json")}
                                loop={true}
                                style={{ height: 250, alignSelf: "center" }}
                                resizeMode="cover" />
                            <LottieView
                                autoPlay={true}
                                source={require("../assets/fireworks.json")}
                                loop={true}
                                style={{ height: 500, position: "absolute"}}
                                resizeMode="cover" />

                            <View style={[{ display: "flex", flexDirection: "row", justifyContent: "space-around" }]}>
                                <Button mode="elevated" buttonColor="#4330a5" onPress={() => {
                                    players.map((item) => {
                                        item.points = 0
                                        item.dealer = false
                                        players[0].dealer = true
                                        item.historyCount = []
                                    })
                                    navigation.pop()
                                }}>
                                    <Text style={[{ color: "#fff", fontWeight: "bold" }]}>Continuar</Text>
                                </Button>
                                <Button mode="elevated" buttonColor="#4330a5" onPress={() => { navigation.popToTop() }}>
                                    <Text style={[{ color: "#fff", fontWeight: "bold" }]}>Novo jogo</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                    <LottieView
                        autoPlay={true}
                        source={require("../assets/fireworks.json")}
                        loop={true}
                        style={{ height: 500, position: "absolute", bottom: 0, zIndex: 10 }}
                        resizeMode="cover" />
                </>
                : <View />}

        </View>
    )
}