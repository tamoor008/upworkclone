import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import JobComp from '../Components/jobComp'
import { useSelector } from 'react-redux';
import {firebase} from '@react-native-firebase/database'
import { AppColors } from '../../../utils/AppColors';

const JobsScreen = ({navigation}) => {
  const refDatabase = firebase.app().database('https://upworkclone-406f6-default-rtdb.firebaseio.com/');
  const jobsref = refDatabase.ref('jobs');

  const dataArray=[]; 


  jobsref.once('value')
  .then(snapshot => {

    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      dataArray.push(data)
      console.log('JOB IS',data);
      
    })

    dataArray.reverse()
    setJobs(dataArray)
    // const data=snapshot.val()
  
    // console.log('User data: ', snapshot.val());
  });


  const [jobs, setJobs] = useState([
  
  ])

  const navigate =(item)=>{
    navigation.navigate('BidScreens',{item})
  }
  return (
    <View style={styles.container}>

      <View style={styles.rowView}>
        <Text style={{flex:1,textAlign:'center',color:'black',fontSize:24,fontWeight:'600'}}>Jobs</Text>
        <Text onPress={()=>{navigation.navigate('CreateJob')}} style={{color:AppColors.mainBlue,fontSize:16,fontWeight:'600',position:'absolute',right:16}}>create job</Text>

      </View>
      <FlatList
      data={jobs}
      renderItem={({item,index})=><JobComp onpress={navigate} item={item}/>}
      keyExtractor={(item)=>item.id}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  rowView: {
    flexDirection: 'row',
    padding:16,
    alignItems:'center'
  }
})

export default JobsScreen