import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LaunchItem from '../src/components/launchItem';

const Favorites  = () => {

  const [favoriteLaunches, setFavoriteLaunches] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);


  // this function calls only on the first time ( ~componentDidMount )
  useEffect(() => {

    let mounted = true;

        setLoading(true);
        getAllLaunches();

      return () => mounted = false;
  }, []);


  // this function calls every time the dependency changes (favoriteLaunches).
  useEffect(() => {

    let mounted = true;

    setLoading(true);
    getAllLaunches();

    setLoading(false);
    return () => mounted = false;

  }, [favoriteLaunches]);


  // this function gets all the keys from the asyncStorage, to load the favorites launches to display
  const getAllLaunches = async () => {

    let launchesIds = [];
    let launchObject = null;
    let allLaunchesObjects = [];

    try {

      launchesIds = await AsyncStorage.getAllKeys();

        for (let id of launchesIds) {
          launchObject = await getData(id);
          allLaunchesObjects.push(launchObject);
        }
    
        // updates the new list
        setFavoriteLaunches(allLaunchesObjects);
    
    } catch(error) {
      console.log(error);
    }
  };


  // this function gets the whole information about the launch, by the given ID
  const getData = async (launchKey) => {
    try {
      const jsonValue = await AsyncStorage.getItem(launchKey);

      return jsonValue != null ? JSON.parse(jsonValue) : null;

    } catch(error) {
        console.log(error);
    }
  }


  // gets updated list of favorite launches from the child component
  const launchesListUpdated = ( newLaunches ) => {
    console.log ( newLaunches.length );
    setFavoriteLaunches(newLaunches);
  }

  
  const renderItem = ({ item }) => {

    let isFavorite = false;
    let infoUrl = null;

    if (item != null) {

      // checks whether it is a favorite launch or not - to display the correct icon.
      isFavorite = (favoriteLaunches.find( currLaunch => currLaunch.id == item.id )) !== null;

      infoUrl = item.program.wiki_url;

      if ( infoUrl === "" ){
          infoUrl = item.pad.wiki_url;
      }
    }

    return (
          <LaunchItem launch={item} isFavorite={isFavorite} navigation={navigation} uri={infoUrl} launchesListUpdated={launchesListUpdated}/>
    );
  };


  return (
    <>
    <SafeAreaView >
      <FlatList
        data={favoriteLaunches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#809fff" animating />
                  : null
          }
      />
    </SafeAreaView>
    </>
  )
}


export default Favorites;