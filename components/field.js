import { View,} from "react-native"
import { TextInput } from "react-native-paper"

export function Field({text, value, onChangeText, keyboardType, placeholder, placeholderTextColor, focus}){
   
    return(
        <View>
            <TextInput autoFocus={focus} style={{backgroundColor: "#f1f1f1"}}  theme={{colors: {text: "#333", surface: "#333", onSurface: "#333"}}} textColor="#333" mode="outlined" outlineColor="#4330a5" activeOutlineColor="#4330a5" label={text} placeholder={placeholder} placeholderTextColor={placeholderTextColor} value={value} keyboardType={keyboardType} onChangeText={onChangeText}/>
        </View>
    )
}