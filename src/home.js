import React, {Component} from 'react';
import type {Node} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image} from 'react-native';
import {Card, ListItem, Button, Icon, Avatar} from 'react-native-elements';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch(
      'https://lldev.thespacedevs.com/2.2.0/launch/?mode=list',
    );
    const json = await response.json();
    this.setState({data: json.results});
  };

  render() {
    const {data, isLoading} = this.state;
    console.log(data);
    console.log('data length: ' + data.length); // todo: remove console.logs...

    return (
      <FlatList
        style={{margin: 5}}
        data={this.state.data}
        numColumns={1}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <Card>
            <Card.Title>{item.name}</Card.Title>
            <Card.Divider />
            {
              <View key={item.id}>
                <Avatar
                  rounded
                  source={{uri: item.image }} 
                  //todo: add null checker, add an dummy photo instead 
                />
                {/* <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{uri: item.image}}
                /> */}
                <Text style={{ textAlign: 'right' }}>{item.location}</Text>
              </View>
            }
          </Card>
        )}
      />
    );
  }
}