import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Text, View } from 'react-native';

class Browser extends Component {

  render() {

    // const { params } = this.props.navigation.state;

    return (
        <>
        <View style={{flex: 1}}>
        <WebView
            source={{ uri: 'https://www.google.com' }}
            style={{ marginTop: 0, marginLeft: -95, height: 300 , width: '150%', flex: 1 }}
            startInLoadingState={true}

            />
            </View>
        </>
    )
  }
}

export default Browser;