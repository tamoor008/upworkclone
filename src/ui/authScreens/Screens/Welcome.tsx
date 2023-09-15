import { View, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database'
import { useDispatch } from 'react-redux';
import { setUid } from '../../../redux/AppReducer';
import { AppColors } from '../../../utils/AppColors';

const Welcome = ({ navigation }) => {

    const refDatabase = firebase.app().database('https://upworkclone-406f6-default-rtdb.firebaseio.com/');
    const refUsers = refDatabase.ref('users');
    const [email, setEmail] = useState('tamoormalik088@gmail.com')
    const [password, setPassword] = useState('Profe$$ional789')
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)







    const handleRegistration = async () => {

        setLoader(true)
        console.log('Handle');

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
                const body = {
                    email: email,
                }

                refUsers.child(user.user.uid).child('credentials').set(body)
                dispatch(setUid(user.user.uid))

                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    setLoader(false)
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    setLoader(false)

                }

                console.log(error);
            });
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 1 }}>

                {loader ? (

                    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} size={'large'} color={AppColors.mainBlue}></ActivityIndicator>
                    </View>
                ) : (
                    <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>

                        <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>
                        <View>
                            <View style={{ marginTop: 29 }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Welcome to Finwiz</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>Let’s create your profile and get started</Text>
                            </View>

                            <View style={{ marginTop: 35 }}>
                                <TextInput value={email} onChangeText={(text) => { setEmail(text) }} placeholder='Email' style={{ borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, marginBottom: 9, padding: 10 }}></TextInput>
                                <TextInput
                                    value={password} onChangeText={(text) => { setPassword(text) }}
                                    secureTextEntry={true}
                                    placeholder='Password' style={{ borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, marginTop: 9, padding: 10 }}>
                                </TextInput>
                            </View>


                        </View>







                        <View style={{ marginBottom: 16 }}>

                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280' }}>By Continuing you agree to Finwiz platform <Text style={{ color: '#1C64F2' }}> terms and conditions, Rewards Policy</Text> and <Text style={{ color: '#1C64F2' }}> Privacy Policy</Text></Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => {

                                    console.log('ONPRESS');

                                    handleRegistration()
                                }}
                                style={{ backgroundColor: AppColors.mainBlue, borderRadius: 4, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Continue</Text>

                            </TouchableOpacity>

                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', alignSelf: 'center', marginTop: 25 }}>Already have an account? <Text onPress={() => { navigation.navigate('SignIn') }} style={{ color: '#1C64F2' }}>Signin</Text></Text>
                            </View>
                        </View>



                    </View>
                )}
            </SafeAreaView>
        </View>


    )
}

export default Welcome