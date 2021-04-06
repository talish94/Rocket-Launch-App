import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, Text, View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from 'react-native-elements'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage from '@react-native-async-storage/async-storage';
import LaunchItem from '../src/components/launchItem';

const Favorites  = () => {

  const [launches, setLaunches] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const getAllKeys = async () => {

       //await AsyncStorage.clear();

      let launchesIds = [];
      let launchObject = null;
      let allLaunchesObjects = [];
  
       try {
        launchesIds = await AsyncStorage.getAllKeys();
        //console.log(launchesIds.length);

        // launchesIds.forEach( async(id)=> {
          for (let id of launchesIds) {
            launchObject = await getData(id);
            allLaunchesObjects.push(launchObject);
          }
       

        setLaunches(allLaunchesObjects);

        //console.log("enddd" + launches.length);
        

      } catch(e) {
        // read key error
        console.log("eroorrrr");
      }
    };
  
      // example console.log result:
      // ['@MyApp_user', '@MyApp_key']
   
      const refresh = setInterval(getAllKeys, 2000);
      //console.log(launches.length);

  }, []);



  const getData = async (launchKey) => {
    try {
      const jsonValue = await AsyncStorage.getItem(launchKey);

      return jsonValue != null ? JSON.parse(jsonValue) : null;

    } catch(e) {
      // error reading value
    }
  }

 
  
    const renderItem = ({ item }) => {

      const isFavorite = (launches.find( launch => launch.id == item.id )) != null;
      //console.log(isFavorite);

      return (
            <LaunchItem item={item} isFavorite={isFavorite} renderItem={renderItem} />
      );
    };




  return (
    <>
    <SafeAreaView style={styles.sectionContainer}>
      <FlatList
        data={launches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
    </>
  )
}



const styles = StyleSheet.create({
  sectionContainer: {
    // marginTop: 32,
    // marginBottom: 20,
    // paddingHorizontal: 24,
  },
image: {
    width: 50,
    height: 50
},
  title: {
    fontWeight: '700',
    fontSize: 20,
  },
  first: {
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 5,
    marginTop: -5,
  },
  second: {
    fontSize: 16,
    fontWeight: '200',
  },
  starIcon: {
    color: "#fcba03",
    alignSelf: "flex-end",
    marginRight: 6,
    marginBottom: -10,
    marginTop: 8,
  },
  successGreen: {
    alignSelf: "flex-end",
    marginRight: 10,
    fontWeight: '700',
    fontSize: 18,
    color: 'green',
    marginTop: -12,
    marginBottom: -8
  },
  successRed: {
    alignSelf: "flex-end",
    marginRight: 10,
    fontWeight: '700',
    fontSize: 18,
    color: 'red',
    marginTop: -12,
    marginBottom: -8
  },
  successMid: {
    alignSelf: "flex-end",
    marginRight: 10,
    fontWeight: '700',
    fontSize: 18,
    color: 'orange',
    marginTop: -12,
    marginBottom: -8
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },

});


export default Favorites;