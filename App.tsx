import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Authnav from './src/navigation/AuthNav'
import MainNav from './src/navigation/MainNav'
import { useSelector } from 'react-redux'

const App = () => {
  const selector = useSelector(state => state.AppReducer);
 
 const uid=selector.uid
 console.log('saved uid ',uid);
 
  return (
    <NavigationContainer>
      {selector.uid?<MainNav/>:<Authnav/>}
      
    </NavigationContainer>

  )
}

export default App