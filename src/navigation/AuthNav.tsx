import React from 'react'
import SignIn from '../ui/authScreens/Screens/SignIn';
import Welcome from '../ui/authScreens/Screens/Welcome';
import { TransitionPresets ,createStackNavigator} from '@react-navigation/stack';


const Authnav = () => {
    const config = {
        animation: {timing:10000},
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
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="SignIn" component={SignIn} options={{ ...TransitionPresets.SlideFromRightIOS,transitionSpec:{open: config, close: config,}}} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ ...TransitionPresets.SlideFromRightIOS,transitionSpec:{open: config, close: config,}}} />
      </Stack.Navigator>
  )
}

export default Authnav