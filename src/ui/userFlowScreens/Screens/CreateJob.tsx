import { View, Text, StyleSheet, ScrollView, FlatList, Image, ActivityIndicator, } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { firebase } from '@react-native-firebase/database'
import { useSelector } from 'react-redux'
import { AppImage } from '../../../utils/AppImages'
import { AppColors } from '../../../utils/AppColors'

const CreateJob = ({ navigation }) => {

  const selector = useSelector(state => state.AppReducer);
    const uid=selector.uid
    console.log('saved uid ',uid);
    const refDatabase = firebase.app().database('https://upworkclone-406f6-default-rtdb.firebaseio.com/');
    const jobsref = refDatabase.ref('jobs');
    // const userJobRef = refDatabase.ref('users').child(uid).child('jobs');
    const [title, setTitle] = useState('sample : Junior React Native')
    const [budget, setbudget] = useState('sample : $750')
    const [description, setDescription] = useState('sample : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum')

    const [selectedValue, setSelectedValue] = useState('Junior')
    const [loader, setLoader] = useState(false)

    const createNewJob = () => {
     
        const newReference = jobsref.push();
        const uniqueId=newReference.key


        setLoader(true)
        const body = {
            id: uniqueId,
            title: title,
            budget: budget,
            description: description,
            expLevel: selectedValue,
            uid:uid
        }

        jobsref.child(uniqueId?.toString()).set(body)
        // userJobRef.child(uniqueId?.toString()).set(body)
        setLoader(false)
        navigation.goBack()

    }
    return (
        <View style={styles.container}>
            {loader ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'}></ActivityIndicator>
                </View> :
                <View style={{ flex: 1 }}>

                    <View style={styles.rowView}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Image style={{ width: 24, height: 24 }} source={AppImage.backarrow} />
                        </TouchableOpacity>
                        <Text style={{ color: 'black', flex: 1, textAlign: 'center', fontSize: 24, fontWeight: '600' }}>CreateJob</Text>
                    </View>

                    <ScrollView style={{ flex: 1, padding: 16 }}>


                        <TextInput value={title} onChangeText={(text) => { setTitle(text) }} placeholder='Title' style={{ marginVertical: 16, textAlignVertical: 'center', height: 50, width: '100%', backgroundColor: '#00000005' }}></TextInput>
                        <TextInput value={budget} onChangeText={(text) => { setbudget(text) }} keyboardType='numeric' placeholder='Budget' style={{ marginVertical: 16, textAlignVertical: 'center', height: 50, width: '100%', backgroundColor: '#00000005' }}></TextInput>
                        <Picker
                            style={{ backgroundColor: '#00000005' }}
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedValue(itemValue)
                            }>
                            <Picker.Item label="Junior" value="Junior" />
                            <Picker.Item label="Intermediate" value="Intermediate" />
                            <Picker.Item label="Senior" value="Senior" />
                        </Picker>
                        <TextInput multiline={true} value={description} onChangeText={(text) => { setDescription(text) }} placeholder='Description' style={{ marginVertical: 16, textAlignVertical: 'top', height: 200, width: '100%', backgroundColor: '#00000005' }}></TextInput>

                    </ScrollView>
                    <TouchableOpacity onPress={() => { createNewJob() }} style={{ height: 50, backgroundColor: AppColors.mainBlue, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: '600' }}>Create Job</Text>
                    </TouchableOpacity>


                </View>}
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
export default CreateJob