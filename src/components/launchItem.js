import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage from '@react-native-async-storage/async-storage';

const LaunchItem  = ({ launch, isFavorite, launchesListUpdated, navigation, uri }) => {

    const [launches, setLaunches] = useState([]);

    // this function calls only on the first time ( ~componentDidMount )
    useEffect(() => {

      const getAllKeys = async () => {
  
        let mounted = true;
    
        let launchesIds = [];
        let launchObject = null;
        let allLaunchesObjects = [];
  
        if (mounted){
    
          try {
            launchesIds = await AsyncStorage.getAllKeys();
  
              for (let id of launchesIds) {
                launchObject = await getData(id);
                allLaunchesObjects.push(launchObject);
              }
          
            setLaunches(allLaunchesObjects);          
  
          } catch(error) {
            console.log(error);
          }
        }
      };
       
        getAllKeys();
        return () => mounted = false;

    }, []);
  
  
    // this function gets full details of the specific launch, by ID
    const getData = async (launchKey) => {
      try {
        const jsonValue = await AsyncStorage.getItem(launchKey);
  
        return jsonValue != null ? JSON.parse(jsonValue) : null;
  
      } catch(error) {
        // error reading value
        console.log(error);
      }
    }

  const openWebView = (uri) => {

      if ( uri != null ) { 
          navigation.navigate('HomeStackScreen' , {
            screen: 'Browser',
            params: { uri: uri }
        })
      }
  };


    const changeFavoriteStatus = async () => {

        if ( isFavorite ){
            try {

                const updatedLaunches = launches.filter((launchId) => launchId.id !== launch.id);
                await AsyncStorage.removeItem(launch.id);

                return updatedLaunches;
            }
            catch(exception) {
                alert("There was an error removing this launch from favourites.");
            }
        }

        else { // adds to favorites
            try {
                const jsonLaunch = JSON.stringify(launch);
                await AsyncStorage.setItem(launch.id, jsonLaunch);

                const updatedLaunches = launches.concat({launch}); // adds the new launch to the list

                return updatedLaunches;

              } catch (exception) {
                // saving error
                alert("There was an error saving this launch to your favourites.");
              }
        }
    }

    return (
        <ListItem key={launch.id} bottomDivider button onPress={() => openWebView(uri)} >

            {
                launch.image !== null
                ?  <Avatar style={styles.image} source={{uri: launch.image}} />
                :  <Avatar style={styles.image} source={require('../../src/assets/launch.jpg')} />
            }
                <ListItem.Content>
                <ListItem.Title style={styles.title} >{launch.name}</ListItem.Title>
                { isFavorite 
                  ?  <Icon style={styles.starIcon} name="star" size={26}  
                        // button onPress={() => {sendDataToParent(changeFavoriteStatus(launch))}} /> 
                        button onPress={ async () => { const newLaunchesList = await changeFavoriteStatus(launch);
                          launchesListUpdated(newLaunchesList);
                        }} /> 

                  :  <Icon style={styles.starIcon} name="star-outline" size={26}  
                      button onPress={ async () => { const newLaunchesList = await changeFavoriteStatus(launch);
                        launchesListUpdated(newLaunchesList);
                        }} /> 
              }
               
                <ListItem.Subtitle style={styles.first}>{launch.pad.location.country_code}</ListItem.Subtitle>
                <ListItem.Subtitle style={styles.second}>{launch.window_start.substring(0, launch.window_start.indexOf("T"))}</ListItem.Subtitle>


                {/* displays the correct color by the launch status */}

                { launch.status.abbrev === "Success" &&
                    <ListItem.Subtitle style={styles.successGreen} >
                        {launch.status.abbrev}
                    </ListItem.Subtitle>
                }
                { launch.status.abbrev === "Failure" &&
                    <ListItem.Subtitle style={styles.successRed} >
                        {launch.status.abbrev}
                    </ListItem.Subtitle>
                }
                    { launch.status.abbrev === "Partial Failure" &&
                    <ListItem.Subtitle style={styles.successMid} >
                        {launch.status.abbrev}
                    </ListItem.Subtitle>
                }
                </ListItem.Content>
        </ListItem>
    )
}



const styles = StyleSheet.create({

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
  }
});

export default LaunchItem;