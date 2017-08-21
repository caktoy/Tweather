/**
 * @name Tweather
 * @author Thony Hermawan
 * @description An mobile app to check city weather
 */

import React, { Component } from 'react';
import { AppRegistry, Alert, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { RkButton } from 'react-native-ui-kitten';
import CityList from './CityList';
import CityDetails from './CityDetails';
import AppInfo from './AppInfo';

var APP = require('./app.json');

const Tweather = StackNavigator({
  Home: { 
    screen: CityList, 
    navigationOptions: ({navigation}) => ({
      title: APP.displayName,
      headerRight: <RkButton 
        style={{backgroundColor: 'transparent', width: 50}} 
        onPress={() => navigation.navigate('Info')}>
          <Image source={require('./res/img/info.png')} style={{width: 20, height: 20}} />
        </RkButton>,
      headerStyle: {
        backgroundColor: '#31a1ce',
      },
      headerTintColor: 'white'
    }),
  },
  Details: { 
    screen: CityDetails,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.city.name} (${navigation.state.params.city.country})`,
      headerStyle: {
        backgroundColor: '#31a1ce',
      },
      headerTintColor: 'white'
    }),
  },
  Info: {
    screen: AppInfo,
    navigationOptions: ({navigation}) => ({
      title: `Tentang Aplikasi`,
      headerStyle: {
        backgroundColor: '#31a1ce',
      },
      headerTintColor: 'white'
    }),
  }
}, {
  headerMode: 'screen'
});

AppRegistry.registerComponent('Tweather', () => Tweather);
