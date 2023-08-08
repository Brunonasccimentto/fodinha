import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Vibration, FlatList, Alert, } from "react-native"
import { Portal, Button, FAB, Provider, Banner, useTheme } from "react-native-paper";
import Toast from 'react-native-toast-message'
import { styles } from "../styles/styles"
import Modal from "react-native-modal";
import { Field } from "../components/field";
import PlayerList from "../components/playerList";
import AntDesign from "@expo/vector-icons/AntDesign"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function PlayersScreen({ navigation }) {

  const [isModalVisible, setModalVisible] = useState(false);
  const [playerName, setPlayerName] = useState()
  const [players, setPlayers] = useState([])
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visibleBanner, setVisibleBanner] = useState(false)
  const [dealer, setDealer] = useState()

  useEffect(() => {
    players.length === 1 ? players[0].dealer = true : null

  }, [players]) //Apenas para atualizar a tela

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const Colors = ["black", "red", "blue", "greenyellow", "purple", "darkorange", "olivedrab", "lightsalmon", "lightseagreen", "orangered", "saddlebrown"]

  const ConfirmPlayer = () => {

    if (playerName == "") {
      return
    }

    if (players.length < 10) {
      const randomColor = Math.floor(Math.random() * Colors.length)

      setPlayers((arr) => [
        ...arr, {
          id: arr.length,
          playerName: playerName,
          playerColor: Colors[randomColor],
          count: 0,
          points: 0,
          historyCount: [],
          dealer: false,
          photo: null
        }])
      setPlayerName("")
      setModalVisible(!isModalVisible);

    } else {
      Vibration.vibrate()
      Toast.show({
        type: "error",
        text1: "Máximo de jogadores atingido"
      })
    }
  };

  const deletePlayer = (id) => {
    players.splice(id, 1)
    setPlayers((arr) => [...arr])
  }

  const HandleOnLongPress = (item) => {

    if (item.dealer === true) {
      item.dealer = false
      setDealer([item])
    } else {
      players.map((item) => { return item.dealer = false })
      item.dealer = true
      setDealer([item])
    }
  }

  const hasUnsavedChanges = true

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    if (!hasUnsavedChanges) {
      // If we don't have unsaved changes, then we don't need to do anything
      return;
    }

    // Prevent default behavior of leaving the screen
    e.preventDefault();

    // Prompt the user before leaving the screen
    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => { } },
        {
          text: 'Discard',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]
    );
  }),
    [navigation, hasUnsavedChanges]
  );

  return (
    <Provider>
      <SafeAreaView style={styles.containerPlayersScreen}>
        <View style={[{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#4330a5", paddingTop: 50, borderBottomRightRadius: 50 }]}>
          <Text style={[{ fontSize: 22, fontWeight: "bold", color: "#f1f1f1", padding: 20 }]}>Jogadores</Text>
          <AntDesign name="questioncircleo" color="#f1f1f1" size={30} style={{ padding: 20 }} onPress={() => { setVisibleBanner(!visibleBanner) }} />
        </View>

        <Banner style={{backgroundColor: "#f1f1f1", color: "#333"}} theme={{colors: {text: "#333", surface: "#333", onSurface: "#333"}}} visible={visibleBanner}
          actions={[{ label: 'Fechar', onPress: () => setVisibleBanner(!visibleBanner) }]}
          icon={() => (<MaterialCommunityIcons name="poker-chip" color="#333" size={30} />)}>

          Icone indica o jogador que deve distribuir as cartas na rodada. Você pode selecionar outro player pressionado seu card.
        </Banner>

        <View style={styles.listContext}>
          <FlatList data={players} showsVerticalScrollIndicator={false} renderItem={({ item }) => (
            <PlayerList
              item={item}
              players={players}
              deletePlayer={deletePlayer}
              LongPress={HandleOnLongPress}
              canSetPhoto={true}/>
          )

          } keyExtractor={(item, index) => { item.id + index }} />

        </View>

        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onSwipeComplete={() => setModalVisible(false)} swipeDirection={["right", "left"]}>
          <Toast />
          <View style={styles.playerModal}>

            <Field text="Nome do novo jogador" focus={true} value={playerName} onChangeText={setPlayerName} />

            <View style={[{ display: "flex", flexDirection: "row", justifyContent: "space-around" }]}>
              <Button mode="elevated" buttonColor="#4330a5" onPress={toggleModal}>
                <Text style={[{ color: "#fff", fontWeight: "bold" }]}>Cancelar</Text>
              </Button>
              <Button mode="elevated" buttonColor="#4330a5" onPress={ConfirmPlayer}>
                <Text style={[{ color: "#fff", fontWeight: "bold" }]}>Confirmar</Text>
              </Button>
            </View>

          </View>
        </Modal>

        <Portal>
          <FAB.Group
            open={open}
            icon={open ? 'window-close' : 'plus'}
            actions={[
              { icon: 'account-plus-outline', style: [{ backgroundColor: "#f1f1f1", padding: 5, borderRadius: 50 }], color: "#4330a5", labelTextColor: "#f1f1f1", label: 'Novo jogador', onPress: () => { toggleModal() } },
              {
                icon: 'gamepad-variant-outline', style: [{ backgroundColor: "#f1f1f1", padding: 5, borderRadius: 50 }], color: "#4330a5", labelTextColor: "#f1f1f1", label: 'Começar Jogo',
                onPress: () => {
                  players.length >= 2 && players.map((item) => { return item.dealer }).includes(true) ?
                  navigation.navigate("GameScreen1", { players: players, setPlayers: setPlayers })
                  : Toast.show({
                    type: "error",
                    text1: "Você precisa de dois ou mais jogadores para começar",
                    text2: "Ou defina o dealer"
                  })
                }
              },
            ]}
            onStateChange={({ open }) => setOpen(open)}
            visible={visible}
            fabStyle={[{ backgroundColor: "#f1f1f1", borderRadius: 50 }]}
            backdropColor="#66666690"
            color={"#4330a5"}
            style={[{ position: "absolute" }]} />
        </Portal>

        <Toast />
      </SafeAreaView>
    </Provider>

  )
}