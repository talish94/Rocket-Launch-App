
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';

import Nav from './src/nav';
import HomeScreen from './src/home';
import UsersScreen from './src/user';
import Browser from './src/components/browser';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const App = () => {
  return (
    <>
        <View>
             <Nav nameOfApp="Rockets Launch App"/>
          </View>

          <NavigationContainer>
          <Tab.Navigator
           initialRouteName="HomeStackScreen"
           tabBarOptions={{
            activeTintColor: '#e91e63',
          }}
          //  activeColor="#e91e63"
           >

              <Tab.Screen
                  name="HomeStackScreen"
                  component={HomeStackScreen}
                  options={{
                      tabBarLabel: 'Home',
                      tabBarIcon: ({ color }) => (
                        <Icon.MaterialCommunityIcons name="home" color={color} size={26} />
                      ),
                    }}
                />
                   {/* <Ionicons name={information-circle-outline} size={23} color={red} />; */}

              <Tab.Screen
              name="Settings"
              component={UsersScreen}
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color }) => (
                  <Icon.MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
              }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
