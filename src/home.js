// import { useNavigation } from '@react-navigation/core';
import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image, StyleSheet} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';


class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      nextUrl: "",
      loading: true,

    };
  }

  
  async componentDidMount() {
        this.setState(() => { return { loading: true }});
        const response = await fetch(
      'https://lldev.thespacedevs.com/2.2.0/launch/?mode=list?limit=10&offset=0',
    );
    const json = await response.json();
    this.setState(() => { return {data: json.results, nextUrl: json.next, loading: false}});
  }

  fetchData = async () => {
    this.setState(() => { return { loading: true }});
    const response = await fetch(
      this.state.nextUrl,
    );
    const json = await response.json();
    // console.log(json.next);
    this.setState(() => { return {data: this.state.data.concat(json.results), nextUrl: json.next, loading: false}});
  };

  openWebView = (item) => {
    console.log('Navigation router run...');

    const title = item.name;

    const infoUrl = item.pad.info_url;
    if ( infoUrl != null )
      return { title, infoUrl };

    // if ( )
    const link = "www.google.com";
    // this.props.navigation.navigate('Browser', { title , link });
  };



  Item = ({ item}) => {
    // console.log(item);
    // console.log(this.state.nextUrl);

    const { navigation } = this.props;

    //const { title, urlSource } = this.openWebView(item);


    return (
        <ListItem key={item.id} bottomDivider button onPress={() => {navigation.navigate('HomeStackScreen' , {
          screen: 'Browser',
          params: { url: 'https://www.google.com' }
        })}}>
            {
                item.image != null
                ?  <Avatar style={styles.image} source={{uri: item.image}} />
                :  <Avatar style={styles.image} source={require('../src/assets/launch.jpg')} />
            }
                <ListItem.Content>
                <ListItem.Title style={styles.title} >{item.name}</ListItem.Title>
                <Icon style={styles.heartIcon} name="heart" size={22}  />
                <ListItem.Subtitle style={styles.first}>{item.pad.location.country_code}</ListItem.Subtitle>
                <ListItem.Subtitle style={styles.second}>{item.window_start.substring(0, item.window_start.indexOf("T"))}</ListItem.Subtitle>

                { item.status.abbrev === "Success" &&
                    <ListItem.Subtitle style={styles.successGreen} >
                        {item.status.abbrev}
                    </ListItem.Subtitle>
                }
                { item.status.abbrev === "Failure" &&
                    <ListItem.Subtitle style={styles.successRed} >
                        {item.status.abbrev}
                    </ListItem.Subtitle>
                }
                  { item.status.abbrev === "Partial Failure" &&
                    <ListItem.Subtitle style={styles.successMid} >
                        {item.status.abbrev}
                    </ListItem.Subtitle>
                }
                </ListItem.Content>
        </ListItem>
    )
  }

  render() {
    // console.log(this.state.showWebView);

    // const navigation = this.props;

    return (
        <>
        {/* {this.state.showWebView &&
         <WebView 
          source={{ uri: 'https://www.google.com' }}
            style={{ marginTop: 0, marginLeft: -95, height: 300 , width: '150%', flex: 1 }}
          />
      }
  */}
        { this.state.data  &&
        
        <FlatList
            contentContainerStyle={styles.sectionContainer}
            data={this.state.data}
            renderItem={this.Item}

            // renderItem={({ item }) =>
            //     <LaunchItem item={item} />
            // }

            keyExtractor={(item, index) => String(index)}
            onEndReached={this.fetchData}
            onEndReachedThreshold={0.1}            
            initialNumToRender={10}
            ListFooterComponent={() =>
                this.state.loading
                  ?        
                              <ActivityIndicator size="large" color="#809fff" animating />
                  : null
                }
        />

        }
        </>
    );
 
  }
}


export default function (props) {
  const navigation = useNavigation();

  return <HomeScreen {...props} navigation={navigation}/>
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
  heartIcon: {
    color: "#d9596c",
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: -10,
    marginTop: 8,
  },
  successGreen: {
    alignSelf: "flex-end",
    marginRight: 30,
    fontWeight: '700',
    fontSize: 18,
    color: 'green',
    marginTop: -12,
  },
  successRed: {
    alignSelf: "flex-end",
    marginRight: 30,
    fontWeight: '700',
    fontSize: 18,
    color: 'red',
    marginTop: -12,
  },
  successMid: {
    alignSelf: "flex-end",
    marginRight: 30,
    fontWeight: '700',
    fontSize: 18,
    color: 'orange',
    marginTop: -12,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },

});