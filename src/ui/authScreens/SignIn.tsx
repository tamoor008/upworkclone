import { View, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { setUid } from '../../redux/AppReducer';
import { AppColors } from '../../utils/AppColors';

const SignIn = ({ navigation }) => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('tamoormalik088@gmail.com')
    const [password, setPassword] = useState('Profe$$ional789')
    const [loader, setLoader] = useState(false)






    const handleSignIn = async () => {

        setLoader(true)
        console.log('Handle');

        auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
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

                console.error(error);
            });
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>

                {loader ? (
                    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} size={'large'} color={AppColors.mainBlue}></ActivityIndicator>
                    </View>) : (
                    <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>

                        <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>
                        <View>

                            <View style={{ marginTop: 29 }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Welcome Back</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>Enter your credentials to continue</Text>
                            </View>

                            <View style={{ marginTop: 35 }}>
                                <TextInput value={email} onChangeText={(text) => { setEmail(text) }} placeholder='Email' style={{ borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, marginBottom: 9, padding: 10 }}></TextInput>
                                <TextInput
                                    value={password} onChangeText={(text) => { setPassword(text) }}
                                    secureTextEntry={true}
                                    placeholder='Password' style={{ borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, marginTop: 9, padding: 10 }}></TextInput>
                            </View>

                        </View>







                        <View style={{ marginBottom: 16 }}>


                            <TouchableOpacity
                                onPress={() => { handleSignIn() }}
                                style={{ backgroundColor: AppColors.mainBlue, borderRadius: 4, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Continue</Text>
                            </TouchableOpacity>

                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', alignSelf: 'center', marginTop: 25 }}>Don't have an account? <Text onPress={() => { navigation.navigate('Welcome') }} style={{ color: '#1C64F2' }}>Sign Up</Text></Text>
                            </View>
                        </View>



                    </View>
                )}


            </SafeAreaView>
        </View>

    )
}

export default SignIn