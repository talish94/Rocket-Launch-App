import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

const Browser = ({ route }) => {

    const { url } = route.params;
    console.log(url);

    return (
        <>
        <View style={{flex: 1}}>
        <WebView
            source={{ uri: url }}
            style={{ marginTop: 0, marginLeft: -95, height: 300 , width: '150%', flex: 1 }}
            />
            </View>
        </>
    )
  }


export default Browser;