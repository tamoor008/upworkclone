import { View, Text } from 'react-native'
import React from 'react'
import SignIn from '../ui/authScreens/Screens/SignIn';
import SignUp from '../ui/authScreens/SignUp';
import Welcome from '../ui/authScreens/Welcome';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import jobsScreen from '../ui/userFlowScreens/Screens/JobsScreen';
import JobsScreen from '../ui/userFlowScreens/Screens/JobsScreen';
import BidScreen from '../ui/userFlowScreens/Screens/BidScreen';
import CreateJob from '../ui/userFlowScreens/Screens/CreateJob';


const MainNav = () => {
  const config = {
    animation: { timing: 10000 },
    config: {
      stiffness: 3000,
      damping: 1000,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JobsScreen" component={JobsScreen} options={{ ...TransitionPresets.SlideFromRightIOS, transitionSpec: { open: config, close: config, } }} />
      <Stack.Screen name="BidScreens" component={BidScreen} options={{ ...TransitionPresets.SlideFromRightIOS, transitionSpec: { open: config, close: config, } }} />
      <Stack.Screen name="CreateJob" component={CreateJob} options={{ ...TransitionPresets.SlideFromRightIOS, transitionSpec: { open: config, close: config, } }} />

    </Stack.Navigator>
  )
}

export default MainNav