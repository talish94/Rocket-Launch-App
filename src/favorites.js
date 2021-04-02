import React from 'react';
import { Text,View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites  = () => {

    const navigation = useNavigation();


    // const getData = async () => {
    //     try {
    //       const jsonValue = await AsyncStorage.getItem('@storage_Key')
    //     //   return jsonValue != null ? JSON.parse(jsonValue).id : null;
    //     // console.log(JSON.parse(jsonValue));
    //     console.log(JSON.parse(jsonValue).name);

    //     return JSON.parse(jsonValue)

    //     } catch(e) {
    //       // error reading value
    //     }
    //   }

      const getAllKeys = async () => {
        let keys = []
        try {
          keys = await AsyncStorage.getAllKeys()
        } catch(e) {
          // read key error
        }
      
        console.log(keys)
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
      }

    return(
        <View>
            <Text style={{ fontSize: 30}} button onPress={() => { getAllKeys(); }}> favoritesss </Text>
            
        </View>
    )
}

export default Favorites;