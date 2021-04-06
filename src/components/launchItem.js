import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, Text, View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from 'react-native-elements'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage from '@react-native-async-storage/async-storage';

const LaunchItem  = ( props ) => {

    const launch = props.item;
    const isFavorite = props.isFavorite;

    //console.log(isFavorite);
    const navigation = useNavigation();

    const changeFavoriteStatus = async () => {

        if ( isFavorite ){
            try {
                await AsyncStorage.removeItem(launch.id);
                console.log("launch was removed from favorites :: " + launch.name);
            }
            catch(exception) {
                alert("There was an error removing this launch from favourites.");
            }
        }

        else { // adds to favorites
            try {
                const jsonLaunch = JSON.stringify(launch);
                await AsyncStorage.setItem(launch.id, jsonLaunch);
                console.log("launch was saved to store :: " + launch.name);
                //props.renderItem(launch);

              } catch (exception) {
                // saving error
                alert("There was an error saving this launch to your favourites.");
              }
        }
    }

    return (

        <ListItem key={launch.id} bottomDivider button onPress={() => {navigation.navigate('FavoritesStack' , {
            screen: 'Browser',
            params: { url: 'https://www.google.com' }
        })}}>

            {
                launch.image != null
                ?  <Avatar style={styles.image} source={{uri: launch.image}} />
                :  <Avatar style={styles.image} source={require('../../src/assets/launch.jpg')} />
            }
                <ListItem.Content>
                <ListItem.Title style={styles.title} >{launch.name}</ListItem.Title>
                { isFavorite 
                  ?  <Icon style={styles.starIcon} name="star" size={26}  
                        button onPress={() => {changeFavoriteStatus(launch)}} /> 
                : <Icon style={styles.starIcon} name="star-outline" size={26}  
                        button onPress={() => {changeFavoriteStatus(launch)}} /> 
              }
               

                <ListItem.Subtitle style={styles.first}>{launch.pad.location.country_code}</ListItem.Subtitle>
                <ListItem.Subtitle style={styles.second}>{launch.window_start.substring(0, launch.window_start.indexOf("T"))}</ListItem.Subtitle>

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

export default LaunchItem;