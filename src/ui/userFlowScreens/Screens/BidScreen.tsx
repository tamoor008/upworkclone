import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { firebase } from '@react-native-firebase/database'
import {AppImage} from '../../../utils/AppImages'
import { AppColors } from '../../../utils/AppColors'

const BidScreen = ({ navigation }) => {

  const selector = useSelector(state => state.AppReducer);
  const [bid, setBid] = useState('sample : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum')
  
  const uid = selector.uid
  console.log('saved uid ', uid);
  const refDatabase = firebase.app().database('https://upworkclone-406f6-default-rtdb.firebaseio.com/');
  const jobsref = refDatabase.ref('jobs');
  // const userJobRef = refDatabase.ref('users').child(uid).child('jobs');



  const route = useRoute()
  const { item } = route.params;
  console.log(item);

  const addBid = (jobId: { toString: () => string }, bid: string ) => {
    const newReference = jobsref.push();
    const uniqueId = newReference.key
    const body = {
      id: uniqueId,
      bid: bid,
      uid:uid
    }
    jobsref.child(jobId.toString()).child('bids').child(uniqueId?.toString()).set(body)
    // userJobRef.child(jobId.toString()).child('bids').child(uniqueId?.toString()).set(body)
    navigation.goBack()


  }

  return (
    <View style={styles.container}>

      <View style={styles.rowView}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Image style={{ width: 24, height: 24 }} source={AppImage.backarrow} />
        </TouchableOpacity>
        <Text style={{ color: 'black', flex: 1, textAlign: 'center', fontSize: 24, fontWeight: '600' }}>Job Details</Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View>
          <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ color: '#00000080', fontSize: 16, fontWeight: 'bold', marginVertical: 16 }}>{item.description}</Text>
        </View>

        <View style={[styles.rowView,{paddingHorizontal:0}]}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>{item.budget}</Text>
          <Text style={{ flex: 1, textAlign: 'right', color: 'black', fontSize: 16, fontWeight: '600' }}>{item.expLevel}</Text>
        </View>

        <TextInput multiline={true} value={bid} onChangeText={(text) => { setBid(text) }} placeholder='Type Your Bid Here' style={{ textAlignVertical: 'top', height: 200, width: '100%', backgroundColor: '#00000005' }}></TextInput>
      </ScrollView>
      <TouchableOpacity onPress={() => { addBid(item.id, bid) }} style={{ height: 50, backgroundColor: AppColors.mainBlue, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 17, fontWeight: '600' }}>Apply Now</Text>
      </TouchableOpacity>



    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  rowView: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center'
  }
})
export default BidScreen