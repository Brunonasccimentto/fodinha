import { useState, useRef } from "react";
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { StatusBar, TouchableOpacity, Modal, ImageBackground } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView, View } from "react-native";

export default function CameraScreen({ route, navigation }) {

    const permission = route.params.permission
    const item = route.params.item
    const camRef = useRef(null)
    const [type, setType] = useState(CameraType.back);
    const [capturedPhoto, setCapturedPhoto] = useState(null)
    const [open, setOpen] = useState(false)

    if (!permission) {
        return <View />;
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function pickture() {
        if (!camRef) return

        let data = await camRef.current.takePictureAsync()
        
        if(type === CameraType.front){
            data = await manipulateAsync(
                data.uri,
                [
                    {rotate: 180},
                    {flip: FlipType.Vertical},
                ],
                {compress: 1, format: SaveFormat.PNG}
            )
        }
        setCapturedPhoto(data.uri)
        setOpen(!open)
        item.photo = data.uri
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <Camera style={{ width: "100%", height: "90%", marginTop: StatusBar.currentHeigh }} type={type} ref={camRef} ratio="16:9">

                <TouchableOpacity style={{ position: "absolute", top: 60, left: 30 }} onPress={() => {navigation.pop()}}>
                    <AntDesign name="back" size={30} color="#f1f1f1" />
                </TouchableOpacity>

                <View style={{ position: "absolute", bottom: 20, display: "flex", justifyContent: "space-around", flexDirection: "row", width: "100%", alignItems: "center" }}>
                    <TouchableOpacity style={{ backgroundColor: "rgba(51, 51, 51, 0.4)", borderRadius: 50, padding: 10 }}>
                        <MaterialCommunityIcons name="image" size={30} color="#f1f1f1" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 5, borderWidth: 2, borderRadius: 50, borderColor: "#f1f1f1" }} onPress={pickture}>
                        <MaterialCommunityIcons name="circle" size={45} color="#f1f1f1" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "rgba(51, 51, 51, 0.4)", borderRadius: 50, padding: 10 }} onPress={toggleCameraType}>
                        <AntDesign name="sync" size={30} color="#f1f1f1" />
                    </TouchableOpacity>
                </View>

            </Camera>
            {capturedPhoto && (
                <Modal
                animationType="slide"
                transparent={true}
                visible={open}
                >
                    <ImageBackground style={{flex: 1}} source={{uri: capturedPhoto}}>
                        <TouchableOpacity style={{ backgroundColor: "rgba(51, 51, 51, 0.4)", borderRadius: 50, padding: 10, position: "absolute", top: 20, left: 20 }} onPress={()=> {setOpen(!open)}}>
                            <AntDesign name="close" size={30} color="#f1f1f1"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "rgba(51, 51, 51, 0.4)", borderRadius: 50, position: "absolute", bottom: 40, right: 40 }} onPress={()=> {navigation.navigate("Jogadores", {item: item})}}>
                            <AntDesign name="checkcircle" size={50} color="#f1f1f1"/>
                        </TouchableOpacity>
                    </ImageBackground>

                </Modal>
            )}

        </SafeAreaView>

    )
}