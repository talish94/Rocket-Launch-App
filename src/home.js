import React, {useEffect, useState} from 'react';
import { ActivityIndicator, SafeAreaView, FlatList, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LaunchItem from '../src/components/launchItem';

import { Searchbar } from 'react-native-paper';


const HomeScreen = () => {

  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [launches, setLaunches] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);


  // this function calls only on the first time ( ~componentDidMount )
  useEffect(() => {

    const fetchData = async () => {

     let mounted = true;
     setLoading(true);

      const response = await fetch(
        'https://lldev.thespacedevs.com/2.2.0/launch/?mode=list?limit=10&offset=0',
      );
      const json = await response.json();
    
      setData(json.results);
      setNextUrl(json.next);
      setLoading(false);
      
    };

   getAllLaunches();
   fetchData();
   return () => mounted = false;

 }, []);


// this function calls every time the dependency changes (favoriteLaunches). ~componentDidUpdate
 useEffect(() => {
    getAllLaunches();

}, [launches]);


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
      
        setLaunches(allLaunchesObjects);      
    
      } catch(e) {
        // read key error
        console.log("eroorrrr");
      }    
  };


  // gets the next 10 luanches from the API
  const fetchMoreData = async () => {
    setLoading(true);
    const response = await fetch( nextUrl );
    const json = await response.json();

    setData(data.concat(json.results));
    setNextUrl(json.next);
    setLoading(false);
  };

  
// gets the whole information about the launch, by the given ID
const getData = async (launchKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(launchKey);

    return jsonValue != null ? JSON.parse(jsonValue) : null;

  } catch(error) {
    console.log(error);
  }
}


  const renderItem = ({ item }) => {

    let infoUrl = null; 

    if (item !== null) {

      let isFavorite = false;

      // checks whether it is a favorite launch or not - to display the correct icon.
      if ( launches.length > 0 ){
        const itemFound = launches.find( launch => launch.id === item.id );
        isFavorite = itemFound != null;
      }

      // gets the Wiki page url for the Webview
      infoUrl = item.program.wiki_url;

      if ( infoUrl === "" ){
          infoUrl = item.pad.wiki_url; // second option to get a wiki url
      }

      return (
        <LaunchItem launch={item} isFavorite={isFavorite} navigation={navigation} url={infoUrl} launchesListUpdated={launchesListUpdated}/>
        );
    }
  };


  // gets updated list of favorite launches from the child component
  const launchesListUpdated = ( newLaunches ) => {
    console.log ( newLaunches.length );
    setLaunches(newLaunches);
  }

  const search = async() => {

      try{

          const response = await fetch(
          `https://lldev.thespacedevs.com/2.2.0/launch/?search=${searchQuery}`,
          );

          return await response.json();
      }

      catch(error){
          console.log(error);
      }
  }
  
  // calls when user press on sucmit search
  const handleKeyDown = async() => {

      if (searchQuery.length > 0) {
        setLoading(true);

        try {
          const searchResults = await search();

          setData(searchResults.results);
          setNextUrl(searchResults.next);
          setLoading(false);
        }

        catch(e){
            console.log(e);
        }
      }
  };


  return (
    <>
    { data  &&
      <>
        <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={handleKeyDown}
        />

        { !loading && data.length == 0 &&
         <Image
            source={require('../src/assets/noResults.png')}
            fadeDuration={0}
            style={styles.noFoundImg}
          />
        }

        <SafeAreaView style={styles.container}>
         
          <FlatList
                  contentContainerStyle={styles.sectionContainer}
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  onEndReached={fetchMoreData}
                  onEndReachedThreshold={0.5}            
                  // initialNumToRender={10}
                  ListFooterComponent={() =>
                      loading ? <ActivityIndicator size="large" color="#809fff" animating />
                              : null
                      }
                />
        </SafeAreaView>
        </>
        }
      </>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  searchBar: {
    width: 400,
    height: 70, 
  },
  noFoundImg: {
    width: 370,
    height: 140,
    alignContent: 'center',
    marginLeft: 10,
    marginTop: 90
  }
});

export default HomeScreen;
