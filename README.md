# Rocket-Launch-App

Answers:

a. 
On this application I created two bottom tabs: Home and Favorites.

The first one makes a HTTP request to the launches API (https://lldev.thespacedevs.com/2.2.0/launch/) to retrieve all the launches data.
I used a Flatlist component, consists of many ListItem components, one for every launch. The launchItem component I created returns the ListItem
with the relevant launch name, an image if exists, a country indicator, the data of the launch, and whether it was a success or a fail action.

When pressing on the star 'favorites' indicator of each launchItem - it adds the launch ID to the asyncStorage and changes the star icon.
When pressing this icon again - it removes the specific launch ID from the asyncStorage, and changes the icon again.

On the 'home' tab there is also the option to search for a specific launch by name. After typing the search query and pressing the 'magnifying glass'
icon - another HTTP request is being created, this time with the searching parameter (name). These results will be updated as the home component's DATA hooks,
and will be displayed as a Flatlist. In case no results found - an appropriate image will be displayed to the user.

Moreover, when the user gets to the end of the list displayed (10 items) - it calls the 'fetchMoreData' function, which updates the url of the fetch data request
by the 'next' value of the last results returned from the server.

The second tab, the 'favorites' tab, displays only the launches that were selected as favorites from the 'home' tab. On component-render, it gets all the keys
from the asyncStorage, which represent the ones that were selected earlier, and displays them as a Flatlist.


On this application I used the following libraries:

- @react-native-async-storage/async-storage: ^1.15.0,  - store the favorites launches
- @react-native-community/masked-view: ^0.1.10,
- @react-navigation/material-bottom-tabs: ^5.3.14,   - tabs navigation
- @react-navigation/native: ^5.9.3,
- @react-navigation/stack: ^5.14.3,  - stack navigation
- react: 16.13.1,
- react-native: ~0.63.3,
- react-native-elements: ^3.3.2,
- react-native-gesture-handler: ^1.10.3,
- react-native-material-design: ^0.3.7,
- react-native-paper: ^4.7.2,    - search bar
- react-native-reanimated: ^2.0.1,
- react-native-safe-area-context: ^3.2.0,
- react-native-screens: ^2.18.1,
- react-native-vector-icons: ^8.1.0",   - adds icons to tabs
- react-native-webview: ^11.3.2",   - open a webview
- react-navigation: ^4.4.4"


b.
1. When removing launch from favorites - sometimes the app crushes.
2. Sometimes it doesn't get the correct Wiki url to open the Webview component, so it open a blank page.

c.
If I had more time I would implement the favorites with react-redux. This library allow access from all application's components to the list of
favorite launches for example. This way, when the user adds a launch from 'home' tab to favorites - it will automatically will be updated at the
reducer, and then re-render on both components: home, as well as favorites. This implementation will assure that the data is updated all the time.

Moreover, I would like to add a feature of 'clearing' the search query and results, which will be more user friendly.


d.
The thing I spent the most time with was the creation of the dynamic list, when each enrty consists of other parameters to display, and to solve the
issue of rendering only the needed parts after update.

At the beginning I tried to create a LaunchesList component, which both 'home' and 'favorites'
components will be able to use and return. The problem was that only 'home' component had to 'fetchMoreData' from the server, hence things got a little
complicated and I decided to implement it differnetly.

Hope you'll like it :)

Attached some app asreens:

![WhatsApp Image 2021-04-08 at 20 04 25](https://user-images.githubusercontent.com/49098945/114072325-d2987080-98aa-11eb-9b68-c2f46f39a7e5.jpeg)
![WhatsApp Image 2021-04-08 at 20 04 48](https://user-images.githubusercontent.com/49098945/114072332-d62bf780-98aa-11eb-9de7-e64fe1b97db9.jpeg)


