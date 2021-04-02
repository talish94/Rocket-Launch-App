import React from 'react';
import { Text,View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Favorites  = () => {

    const navigation = useNavigation();

    return(
        <View>
            <Text style={{ fontSize: 30}} button onPress={() => {navigation.navigate('FavoritesStackScreen' , {
          screen: 'Browser',
          params: { url: 'https://www.google.com' }
        })}}> favoritesss </Text>
            
        </View>
    )
}

export default Favorites;