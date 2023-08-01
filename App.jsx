import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from "./styles/styles"
import HomeScreen from './pages';
import PlayersScreen from './pages/players';
import GameScreen1 from './pages/gameScreen1';
import GameScreen2 from './pages/gameScreen2';
import CameraScreen  from './pages/camera';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#4330a5" style='light' />

      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerStyle: { backgroundColor: '#f1f1f1', marginTop: StatusBar.currentHeight } }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Jogadores" component={PlayersScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GameScreen1" component={GameScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="GameScreen2" component={GameScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{headerShown: false}}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}

