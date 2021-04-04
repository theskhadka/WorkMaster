import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';


import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';


export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  HomeScreen:{screen: HomeScreen},
  CreateScreen: {screen: CreateScreen},
})

const AppContainer =  createAppContainer(switchNavigator);