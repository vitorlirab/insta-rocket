import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Image} from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';

export default createAppContainer(
  createStackNavigator(
    {
      Feed: {
        screen: Feed,
        navigationOptions: {
          headerTitle: () => <Image source={logo} />,
        },
      },
      New: {
        screen: New,
        navigationOptions: {
          headerTitle: 'Nova Publicação',
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#000',
        headerTitleAlign: 'center',
        headerBackTitle: null,
      },
      mode: 'modal',
    }
  )
);
