import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites  = () => {

  const [launces, setLaunches] = useState([]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   getAllKeys();
  // });



  const getAllKeys = async () => {

    let launchesIds = [];
    let launchObject = null;
    let allLaunchesObjects = [];

    try {
      launchesIds = await AsyncStorage.getAllKeys();

      launchesIds.forEach( async(id)=> {
        launchObject = await getData(id);
        //console.log(launchObject.name);

        allLaunchesObjects.push(launchObject);
      })

      setLaunches(allLaunchesObjects);
      console.log(launces);
      
    } catch(e) {
      // read key error
    }

    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }

  const getData = async (launchKey) => {
    try {
      const jsonValue = await AsyncStorage.getItem(launchKey);

      return jsonValue != null ? JSON.parse(jsonValue) : null;

    // console.log(JSON.parse(jsonValue));
    // return (JSON.parse(jsonValue));

    } catch(e) {
      // error reading value
    }
  }

  return(
      <View>
          <Text style={{ fontSize: 30}} button onPress={() => { getAllKeys(); }}> favoritesss </Text>
          
      </View>
  )
}

export default Favorites;