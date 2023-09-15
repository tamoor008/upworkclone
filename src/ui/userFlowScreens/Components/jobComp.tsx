import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppColors } from '../../../utils/AppColors';

const JobComp = ({ item,onpress }) => {
    // console.log(item);

    return (
        <TouchableOpacity onPress={()=>{onpress(item)}} activeOpacity={0.8} style={styles.container} >
            <Text style={{color:AppColors.mainBlue,fontSize:22,fontWeight:'600'}}>{item.title}</Text>

            <View style={styles.rowView}>
                <Text style={{color:'black',fontSize:17,fontWeight:'600'}}>{item.budget}</Text>
                <Text style={{color:'black',fontSize:17,fontWeight:'600'}}>{item.expLevel}</Text>
            </View>
            <Text style={{color:'#00000080',fontSize:17,}}>{item.description}</Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex: 1,
        margin:16,
        padding:16,
        elevation:10
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical:12
    }
})

export default JobComp