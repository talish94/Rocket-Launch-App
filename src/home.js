import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image, StyleSheet} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default class App extends Component {
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


  Item = ({ item}) => {
    const date = item.window_start.substring(0, item.window_start.indexOf("T"));
    // console.log(item);
    const country = item.pad.location.country_code;
    const isSuccess = item.status.abbrev;
    // console.log(this.state.nextUrl);

    return (
        <ListItem key={item.id} bottomDivider>
                <Avatar style={styles.image} source={{uri: item.image}} />
                <ListItem.Content>
                <ListItem.Title style={styles.title} >{item.name}</ListItem.Title>
                <Icon style={styles.heartIcon} name="heart" size={22}  />
                <ListItem.Subtitle style={styles.first}>{country}</ListItem.Subtitle>
                <ListItem.Subtitle style={styles.second}>{date}</ListItem.Subtitle>

                { isSuccess === "Success" &&
                    <ListItem.Subtitle style={styles.successGreen} >
                        {isSuccess}
                    </ListItem.Subtitle>
                }
                { isSuccess === "Failure" &&
                    <ListItem.Subtitle style={styles.successRed} >
                        {isSuccess}
                    </ListItem.Subtitle>
                }
                  { isSuccess === "Partial Failure" &&
                    <ListItem.Subtitle style={styles.successMid} >
                        {isSuccess}
                    </ListItem.Subtitle>
                }
                </ListItem.Content>
        </ListItem>
    )
}

  render() {
    console.log(this.state.nextUrl);

    return (
        <>

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