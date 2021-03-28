import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const Nav = ({nameOfApp}) => (
    <View style={styles.nav}>
        <Text style={styles.navText} >{nameOfApp}</Text>
    </View>
)

const styles = StyleSheet.create({
    nav:{
        backgroundColor: '#809fff',
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    navText:{
        fontSize: 30,
    }
})

export default Nav;