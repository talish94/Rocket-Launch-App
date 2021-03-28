/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Nav from './src/nav';
import HomeScreen from './src/home';
import UsersScreen from './src/user';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from './src/utils/icons'; 

const Tab = createMaterialBottomTabNavigator();


const App = () => {
  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
    <>
        <View>
             <Nav nameOfApp="Rockets Launch App"/>
           
             {/* <Text>
                Hello
              </Text>  */}
          </View>

          <NavigationContainer>
          <Tab.Navigator
           initialRouteName="Home"
           tabBarOptions={{
            activeTintColor: '#e91e63',
          }}
          //  activeColor="#e91e63"
           >

              <Tab.Screen
                  name="Home"
                  component={HomeScreen}
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
    //   </ScrollView>
    // </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
