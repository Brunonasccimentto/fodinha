import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({

    containerHomeScreen: {
      flex: 1,
      justifyContent:"center",
      alignItems: "center",
      backgroundColor: "#4330a5", 
      gap: 20
    },

    containerPlayersScreen: {
      flex: 1,
      backgroundColor: '#f1f1f1',
      
    },

    addPlayerButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4330a5",
        borderRadius: 100,
        padding: 15,
        width: 60,
        position: "absolute",
        bottom: 10,
        right: 10,
        elevation: 10
    },
    startButton: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#4330a5",
      padding: 15,
      borderRadius: 20,
      elevation: 5,
      width: windowWidth / 2
    },
    finishButton: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f1f1f1",
      padding: 15,
      borderRadius: 20,
      elevation: 5,
      width: windowWidth / 2,
      alignSelf: "center",
      position: "absolute",
      bottom: 40
    },
    playerModal: {
      backgroundColor: "#f1f1f1",
      display: "flex",
      gap: 30,
      padding: 20,
      borderRadius: 5
    },
    modalButton:{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#3676dd",
      padding: 10,
      width: windowWidth / 3,
      borderRadius: 50
    },
    card: {
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
      marginVertical: 5, 
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cardContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: windowWidth / 2.5,
    },
    shadowProp: {
      shadowColor: '#171717',
      elevation: 5,
      overflow: "hidden", 
      marginHorizontal: 10,
    },
    startGame: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#3676dd",
      borderRadius: 90,
      padding: 15,
      width: 60,
      position: "absolute",
      bottom: 110,
      right: 40
    },
    listContext: {
      marginTop: 10,
      paddingHorizontal: 10,
      overflow: "scroll",
      flex: 1,
    },
    selected: {
      position: "absolute", 
      backgroundColor: "rgba(0, 0, 0, 0.3)", 
      height: "100%", width: "100%", top: 0, 
      borderRadius: 8,
    }
    
  });
  