import React from 'react';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Nav from './src/nav';
import HomeScreen from './src/home';
import Favorites from './src/favorites';
import Browser from './src/components/browser';
import Icon from './src/utils/icons'; 

const Tab = createMaterialBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen}/>
        <HomeStack.Screen name="Browser" component={Browser}/>
    </HomeStack.Navigator>
  )
}


const FavoritesStack = createStackNavigator();

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
        <FavoritesStack.Screen name="Favorites" component={Favorites}/>
        <FavoritesStack.Screen name="Browser" component={Browser}/>
    </FavoritesStack.Navigator>
  )
}


const App = () => {
  return (
    <>
        <View>
             <Nav nameOfApp="Rockets Launch App"/>
          </View>

          <NavigationContainer>
          <Tab.Navigator
                    barStyle={{ backgroundColor: '#4d79ff' }}
           >

              <Tab.Screen
                  name="HomeStackScreen"
                  component={HomeStackScreen}
                  options={{
                      tabBarLabel: 'Home',
                      tabBarIcon: ({ color }) => (
                        <Icon.MaterialCommunityIcons name="home" color={color} size={28} />
                      ),
                    }}
                />

              <Tab.Screen
              name="FavoritesStackScreen"
              component={FavoritesStackScreen}
              options={{
                tabBarLabel: 'Favorites',
                tabBarIcon: ({ color }) => (
                  <Icon.MaterialCommunityIcons name="star" color={color} size={27} />
                ),
              }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </>
  );
};


export default App;
