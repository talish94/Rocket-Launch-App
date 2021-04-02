import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Text, View } from 'react-native';

const Browser = ({ route }) => {

    const { url } = route.params;

    return (
        <>
        <View style={{flex: 1}}>
        <WebView
            source={{ uri: url }}
            style={{ marginTop: 0, marginLeft: -95, height: 300 , width: '150%', flex: 1 }}
            // startInLoadingState={true}
            />
            </View>
        </>
    )
  }


export default Browser;